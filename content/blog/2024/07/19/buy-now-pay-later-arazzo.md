---
title: A Buy-now, Pay-later Use Case for Arazzo
date: "2024-07-19"
author: sensiblewood
category: blog
permalink: /blog/2024/07/19/buy-now-pay-later-arazzo
---

# Buy-now, Pay-later – An Example Use Case for the Arazzo Specification

The continued growth of the API economy presents us with an ever-increasing number of APIs we use in building systems and doing business. With this volume of APIs comes complexity. We find ourselves calling multiple APIs, from the same provider and across multiple API providers, to execute a given business function. This growth in the interdependency of API operations has created a need for sequences of API calls to be described _programmatically_ , which is why our Workflows Special Interest Group created the [Arazzo Specification](https://spec.openapis.org/arazzo/latest.html)

Arazzo is a description language that can reference multiple APIs, each described with an OpenAPI description or another Arazzo description, that provides API consumers with a rich view of complex, multistep workflows. Arazzo supports describing dynamic values, allowing API providers or API marketplaces to indicate how API operations relate to each other and the output and inputs that can be carried between each step. When supported by appropriate tooling this can significantly accelerate implementation time for API consumers and ensure they can handle sequences of API requests more accurately.

The use case for an Arazzo description can be applied across almost any industry or vertical. Financial services APIs, for example, demonstrate how such orchestration needs have grown across an ecosystem, where examples of APIs that need to be called in sequence are common for operations like account opening and payments. Buy-now, pay-later (BNPL) is one such use case, as this generally requires multiple API calls to secure a loan at the point of purchase. The sequence of steps can be generalized as follows:

1.  Product Eligibility Check: Customers select the BNPL option at checkout. An API call is made to correlate the items in the customer’s basket with BNPL finance options. The BNPL options are then displayed to the customer.
2.  Customer Selection: The customer chooses an offer from the list displayed. An API call is then made to retrieve terms and conditions.
3.  Eligibility Verification: Once the customer has selected the product and accepted the terms and conditions, an eligibility/credit check may be required, which may involve enrolling the customer on the BNPL platform.
4.  Initiate BNPL Transaction: With product selection and eligibility complete the BNPL transaction then takes place. An API call is made from the checkout provider to the BNPL platform with the order details and customer information.
5.  Authentication & Authorization: The customer may then be required to authenticate themselves at the BNPL provider and authorize the transaction. This may happen through redirection to the BNPL platform.
6.  Finalize Payment Plan: Once the transaction is validated and the customer authenticated, the checkout will retrieve the finalized details of the loan including the payment schedule, interest rates, and so on.
7.  Order Confirmation: Confirmation of the BNPL transaction and payment plan acceptance is then signaled through an API call.
8.  Update Order Status: With financing secured the eCommerce platform will proceed with fulfillment and confirm fulfillment back to the BNPL platform.
9.  Payment Updates: Optionally, for subscription-based products, there may be ongoing updates over callbacks or webhooks from the BNPL platform to the eCommerce platform, with events such as missed payments or loan completion.

The sequence diagram below reflects the steps 1 to 8 described above:

![](/img/uploads/2024/07/sequence-diagram.webp)

This example reflects how composable software services have become and how we can tailor our platforms based on the myriad of available API providers. The steps and sequence diagram show the complexity that typifies such business flows, especially in eCommerce and is exactly the scenario Arazzo looks to address. An Arazzo description is designed to help platform providers describe flows across their APIs and take the guesswork out of stitching them together. This is of significant benefit for API consumers as they get a structured, versioned description of the required steps that they can use to implement their integration. This gives API consumers a reference point they can rely on to ensure their workflow is implemented as expected and working correctly.

To help bring this example to life, we’ve created a BNPL [Arazzo description](https://github.com/OAI/Arazzo-Specification/blob/main/examples/1.0.0/bnpl-arazzo.yaml) and [OpenAPI description](https://github.com/OAI/Arazzo-Specification/blob/main/examples/1.0.0/bnpl-openapi.yaml) in the Arazzo Specification repository.

The BNPL description includes the inputs to the sequence described above, defined as a [Workflow Object](https://spec.openapis.org/arazzo/latest.html#workflow-object):

```
- workflowId: ApplyForLoanAtCheckout
  summary: Apply for a loan at checkout using a BNPL platform
  description: Describes the steps to secure a loan at checkout from a BNPL platform. It is a multistep process that requires multiple API calls across several API providers to be completed successfully.
  inputs:
    type: object
    required:
      - customer
      - products
    properties:
      customer:
        # Customer properties
      products:
        # Product properties
```

The Workflow Object defines the parameters required to initiate the flow which, in this case, include the parameters to make the first API call to check product eligibility and a later step to check customer eligibility for the loan. The inputs to this workflow are:

-   The customer details, which can be the full details or a URL that indicates an existing customer resource if the customer is already enrolled on the BNPL platform.
-   An array of products, used to assess the customer basket qualification for a checkout loan at the BNPL platform.

All other arguments in the sequence are then elicited using response properties from each API call. These are represented by [Step Objects](https://spec.openapis.org/arazzo/latest.html#step-object) that define the sequence, the conditions that indicate a step has been successful and pointers to dynamic values that can be passed between steps.

For example, the first step in our BNPL use case was to check products in the customer’s basket that were eligible for a loan. This is encapsulated in the following Step Object:

```
- stepId: checkLoanCanBeProvided
  description: |
    Call the BNPL API to filter the basket for products qualifying for checkout loans. Pass in the array of products from the workflow input as the payload for the API call.

    Act on the response payload:

    - If a list of qualifying products is returned then submit customer choices.
    - If the list of qualifying products is empty then end the workflow
  operationId: findEligibleProducts
  requestBody:
    contentType: application/json
    payload: |
      {
        "customer": "{$inputs.customer}",
        "products": "{$inputs.products}"
      }
  successCriteria:
    - condition: $statusCode == 200
  onSuccess:
    - name: existingCustomerNotEligible
      type: end
      criteria:
        - condition: $statusCode == 200
        - condition: $response.body.existingCustomerNotEligible == false
    - name: qualifyingProductsFound
      type: goto
      stepId: getCustomerTermsAndConditions
      criteria:
        - condition: $statusCode == 200
        - context: $response.body
          type: jsonpath
          condition: $[?count(@.products) > 0]
    - name: qualifyingProductsNotFound
      type: end
      criteria:
        - condition: $statusCode == 200
        - context: $response.body
          type: jsonpath
          condition: $[?count(@.products) == 0]
  outputs:
    eligibilityCheckRequired: $response.body.eligibilityCheckRequired
    eligibleProducts: $response.body.products
    totalLoanAmount: $response.body.totalAmount
```

The Step object definition provides:

-   The unique identifier for the definition.
-   A reference to the operationId value of the associated Operation in the target OpenAPI description.
-   A Request Body Object to describe the inputs to the step, which can include external inputs defined in the Workflow object. In this case, we reference the products in the customer’s basket and their customer details.
-   The success criteria that define whether the step was successful. This is expressed through one or more conditions evaluated using HTTP return codes and properties of the response body, referenced using JSON Path.
-   Directives on what to do if the API call was successful. In this case, if zero qualifying products are returned the workflow ends.
-   Outputs from the step that allows dynamic values to be passed to subsequent steps. In our example, these include the filtered product details that can be shown to the customer to indicate which products are eligible for a BNPL loan and whether a customer eligibility check is required.

The Arazzo Specification is therefore geared towards providing a simple, declarative approach to describe a sequence of API calls to provide flexibility for the API provider and ease of use for the API consumer. You can follow our full example using the links above to discover more about how the Arazzo Specification can help you describe complex, multistep sequences of API calls.

If you are interested in learning more about Arazzo please read the [specification](https://spec.openapis.org/arazzo/latest.html), visit our [discussions](https://github.com/OAI/Arazzo-Specification/discussions) or join us on [Slack](https://open-api.slack.com/archives/C022K8VD7AP). Feedback on the Arazzo Specification is most welcome!
