---
title: OpenAPI Initiative Welcomes Level 250 as Newest Member
date: "2021-03-11"
wordpressId: 1848
author: openapi
category: announcement
tags:
  - new-member
  - openapi-3-0-spec
permalink: /blog/2021/03/11/openapi-initiative-welcomes-level-250-as-newest-member
generated: true
---

![](https://lh4.googleusercontent.com/iMB2l57ShbbkOwIoYvFiOKog1l7oHNF2rEr1XDGoLRgBdk5L5KWhU3xySTOyZahjS7lLj2lplwOrUdxb3m0Nw2sgjGnZLOA2vEkN6gU4CiKEcmKWn9GxCBRYBqkodMbaNtP4wxUz)

Level 250 is joining the OpenAPI Initiative! Level 250 is a consulting organization that helps companies large and small improve their Product Strategies around SaaS, APIs and Developer-focused Tools: [https://www.level250.com](https://www.level250.com)

Level 250 is run by Emmanuel Paraskakis, who has over 20 years of far-reaching experience in Product Management in organizations ranging from early-stage startups to Fortune 500 companies. Paraskakis was VP of Product Management for two of the most important API products in the world: Apiary with API Blueprint (acquired by Oracle) and SwaggerHub (and the Swagger Open Source toolset) which uses OpenAPI.

With that extensive API and product background, we asked Paraskakis about Level 250, implementing the new OpenAPI Specification 3.1.0, and where APIs are headed. We found out about how the requirements of API builders and API consumers are converging, about major improvements in reuse that will help managing scale, helping non-humans (yes), and a lot more!

# — Why did Level 250 join OpenAPI Initiative and Why Now?

I have always been involved in OpenAPI, with two previous member companies, Apiary and SmartBear and so it’s part of my background. APIs and OpenAPI are at the center of everything we do at Level 250, so I want to continue to support OpenAPI in any way I can.

What makes this even more relevant today is that OpenAPI is becoming so much more that just one Spec: it’s the place where thinking and collaboration around APIs happens, whether it’s about the original OpenAPI spec, or adjacent specs such as JSON Schema and AsyncAPI, and beyond. I think OAI is becoming a focal point where the requirements of API builders and API consumers are converging. Exciting times!

# — What’s the biggest issue with implementing the OpenAPI Specification?

I think the Spec is a wonderful interchange format, a Lingua Franca that most API Tools speak, so you can for example take a document that was meant as a design and reuse it to configure your API Management or your Security tests.

But because it’s become complex, encompassing many use cases, I think it’s difficult to learn and I also think it’s hard to write, for the Design-first use case for example. There are tools that make the process easier, with syntax suggestions or even UI editors, but the underlying complexity remains.

I’d love to see a simpler language that could be written by hand, perhaps leveraging examples, during the ideation and design process, and that could then translate directly into the current Spec for interoperability.

Beyond that, I think we could work more on making modularity and composition easier and also the handling of metadata, discovery and runtime configuration of API Gateways.

# — Who should use the OpenAPI Specification 3.1.0?

I think the most exciting news is the full JSON Schema compatibility and support of the latest 2020-12 draft! This allows anyone to describe data structures in more detail and enhances compatibility with external tooling.

Another huge win will be for folks that need to describe Webhooks and they’ve been requesting this for some time.

One of the changes that doesn’t seem to get talked about much is the fact that you don’t \_need\_ to have a top-level \`paths\` element, you can just describe \`components\` and that’s still a valid OpenAPI document. That’s a huge step forward for reuse. So anyone who has lots of OpenAPI documents and is experiencing the pain of repeating information with all the problems that attracts, should be making the jump to 3.1.

# — What’s your vision for the future API stack 1-3 years out?

The main problems being encountered today on the API provider side are those of managing scale and decreasing time to market, so I think Specs and various description formats play a huge role by acting as a source of truth for how our services work. I hope to see tooling that uses declarative documents to inform the entire API-building lifecycle, from ideation and design, to building tests, creating deployments on multiple environments and setting up monitoring/analytics tools – all based on the same source of truth!

On the API consumer side, we are still sending developers to documentation that can vary in quality and completeness. Humans are great at dealing with ambiguity and hopefully they’ll reach out when they have a support question. But increasingly services are consumed and discovered by machines, so I hope to see tooling that helps non-humans discover and understand the capabilities of APIs.

* * *

## OpenAPI Resources

To learn more about participate in the evolution of the OpenAPI Specification: [https://www.openapis.org/participate/how-to-contribute](/participate/how-to-contribute)

-   [Become a Member](/membership/join)
-   [OpenAPI Specification Twitter](https://twitter.com/OpenApiSpec)
-   [OpenAPI Specification GitHub – Get started immediately](https://github.com/OAI/OpenAPI-Specification)!
-   [Share your OpenAPI Spec v3 Implementations](/specification/v3implementations-form)

**About the OpenAPI Initiative**

The OpenAPI Initiative (OAI) was created by a consortium of forward-looking industry experts who recognize the immense value of standardizing on how APIs are described. As an open governance structure under the Linux Foundation, the OAI is focused on creating, evolving and promoting a vendor neutral description format. The OpenAPI Specification was originally based on the Swagger Specification, donated by SmartBear Software. To get involved with the OpenAPI Initiative, please visit[https://www.openapis.org](/)

**About Linux Foundation**

Founded in 2000, the Linux Foundation is supported by more than 1,000 members and is the world’s leading home for collaboration on open source software, open standards, open data, and open hardware. Linux Foundation projects like Linux, Kubernetes, Node.js and more are considered critical to the development of the world’s most important infrastructure. Its development methodology leverages established best practices and addresses the needs of contributors, users and solution providers to create sustainable models for open collaboration. For more information, please visit us at linuxfoundation.org.
