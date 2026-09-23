---
title: Leveraging the OpenAPI Specification in Financial Services – The Story of Plaid’s OpenAPI Journey
date: "2021-04-13"
wordpressId: 1873
author: openapi
category: blog
permalink: >-
  /blog/2021/04/13/leveraging-the-openapi-specification-in-financial-services-the-story-of-plaids-openapi-journey
generated: true
---

![](https://docs.google.com/drawings/u/2/d/sMN5wlKU409dE3hvct0l67g/image?w=342&h=239&rev=247&ac=1&parent=1Gf_gbr6SA-uCZKmrsRRQFurfVHzRGWulFG8aX6HALA4)

_Written by Kin Lane, Chief Evangelist, Postman_

The complexity of providing financial services to businesses and consumers in today’s business climate is hard to overstate. APIs are a critical component in providing products and services.

Plaid, whose mission is to democratize financial services through technology,  is a company that provides APIs for developers building applications in the fintech space. Plaid’s platform allows applications to connect with users’ accounts at banks and other financial institutions. Consumers and businesses can take advantage of a wide array of Plaid-powered apps to quickly and easily transfer funds, analyze their spending, apply for loans, and more.

Based on the new OpenAPI Specification 3.1.0, Plaid built an API document which allows them to easily release updates to their client libraries (they support five: Ruby, Node, Python, Java, Go). And, they have [released an OpenAPI file for auto-generating your own client libraries in your preferred programming language](https://github.com/plaid/plaid-openapi), making it simple for you to auto-generate your own client libraries in over 40 different languages–so you can easily build with Plaid no matter the language you use.

## The Journey to OpenAPI

The OpenAPI journey at Plaid did not begin with a single person or team, but was something that grew out of multiple teams with different motivations for why they needed a single machine readable truth to exist for their banking APIs. I recently spoke with Alex Hoffer of the developer relations team at Plaid to learn more about the motivations behind why Plaid chose to use the OpenAPI Specification, but also understand a little about how they arrived where they are at.

Plaid had recently published their [OpenAPI to a GitHub repository](https://github.com/plaid/plaid-openapi) , and I thought it was a great opportunity to reach out and talk about their adoption of the OpenAPI Specification and see if they were willing to share their story with us. They were! So thank you to the Plaid team for talking with us, and sharing the details behind how OpenAPI is being applied across API operations at the banking API platform.

## Creating Better Documentation More Quickly

Like most API providers, the number one reason Plaid adopted the OpenAPI Specification (OAS) was to deliver documentation for their public API. Plaid’s documentation had been in use for quite some time now, and needed a refresh, so the developer relations team embarked on a complete rewrite, and they wanted to make sure they were able to future proof their documentation so that they could evolve it alongside their API. After researching the situation it was clear that the OpenAPI Specification (OAS) was the most effective way for describing Plaid APIs in a way that would be extensible and allow it to power the current and future state of their banking API documentation. The Plaid team moved forward with a complete reworking of their documentation, and as they were working on delivering a complete OpenAPI for the Plaid API documentation other teams were also putting OpenAPI to work powering their own corner of the Plaid platform.

## Delivering Client Libraries

As the developer relations team was working on the Plaid OpenAPI document, their developer experience team was also working understanding how it could also be used to deliver client libraries for the API across multiple programming languages. The developer experience team at Plaid pushes the release of multiple SDKs for the API every two weeks, which is a manual process that takes a significant amount of work and is prone to errors, while also requiring significant expertise in each language required to deliver the best possible SDK. With all this work the developer experience team was very keen on being able to automate as much of the process as possible, but as they got to work on generating SDKs from the OpenAPI they realized that the process would demand a much more robust and complete OpenAPI to deliver all of the details needed for each of the language libraries. Ultimately it took the team five months to deliver a beta set of SDKs that met the team’s expectations, but now they have a much more streamlined approach to delivering SDKs across multiple languages, while also ensuring that the SDK release process is always in alignment with the evolution of API documentation, since they both are driven from the same machine readable truth—the Plaid OpenAPI contract.

## JSON Schema Now Available

Beyond developer relations and experience at Plaid, the core services team also caught wind of the OpenAPI that was being used to power documentation and generate client SDKs. The team was interested in the centralization of a machine readable truth for the Plaid API, but were particularly interested in the JSON schema now available to describe the request and response payload for each API. There was anxiety from internal developers when it came to introducing changes to the schema that was used to power the platform, and with limited visibility into what might be a breaking change with any release, developers were left with a lot of questions. With the existence of a central set of JSON Schema definitions now available as part of the OpenAPI, internal developers could now use them to validate as part of pipelines and middleware across the Plaid platform, ensuring that ongoing changes did not update or remove any properties that might introduce errors into the APIs and downstream applications of integrations. Leveraging the central OpenAPI to help make releases more reliable and less stressful for internal developers who were moving the API platform forward with new features and capabilities—reducing friction for the Plaid platform.

## Defining Extensions

## ![](https://docs.google.com/drawings/u/2/d/sUT7H3MBb5DX7TkYClYK1pg/image?w=400&h=281&rev=155&ac=1&parent=1Gf_gbr6SA-uCZKmrsRRQFurfVHzRGWulFG8aX6HALA4)

With the introduction of OpenAPI into the documentation, validation, and delivery of SDKs for the Plaid APIs, there were numerous immediate benefits that the teams were able to take advantage of. However, all three teams quickly began bumping against the limitations of what the OpenAPI Specification was capable of defining. Some of these needs were unique to the way Plaid does things, but other needs resemble many of the common needs you see across other API providers. This didn’t slow the Plaid teams down, and they quickly got to work defining extensions for OpenAPI that would help them define what they needed for documentation but also the very demanding needs of generating SDKs in multiple programming languages. Most notably, they also established an x-plaid- extension that would be used to describe internal schema and capabilities that would be stripped from the OpenAPI anytime the definition would be made available to the Plaid community. This work really helped Plaid realize that the OpenAPI specification really shines when you extend and push the specification to do exactly what you need, allowing the machine readable truth for their API to effectively deliver multiple essential stops along the API lifecycle like documentation, SDK generation, and validation.

## Customers Request OpenAPI Specification

The Plaid OpenAPI journey reflects what many OpenAPI adopters have experienced, or are currently experiencing. While there are many motivations for why API providers adopt OpenAPI, the need to power always up to date API documentation and SDKs in a variety of programming languages are the top two. It is a journey that usually begins with the need for providing better documentation, but then as teams realize the same OpenAPI can be used to power other stops along the API lifecycle, they really see the potential of the API specification as a single source of truth or APIs. It is great to hear the story behind why Plaid is using OpenAPI, and hopefully this story provides a look into the “known knowns” of what OpenAPI can do within Plaid, but as I was finishing my conversation with Alex Hoffer, I asked her why they had published their OpenAPI to GitHub—which ultimately was the catalyst for this conversation. She simply said that an OpenAPI was a common request from their customers so they could generate their own libraries for languages they didn’t support, but also after speaking with other leading API Providers in the space, they had mentioned they were surprised by the unique things that their community was doing with their OpenAPI, innovating beyond what internal teams could deliver. Which really gets at the most powerful reasons for providing an OpenAPI for your API community, in that it will enable entirely new approaches to putting your APIs to work, which is really why we are all doing APIs in the first place. OpenAPI is just amplifying this effect and taking things to entirely new levels.
