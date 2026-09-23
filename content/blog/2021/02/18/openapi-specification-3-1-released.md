---
title: OpenAPI Specification 3.1.0 Released
date: "2021-02-18"
wordpressId: 1797
author: openapi
category: announcement
tags:
  - 3-1
  - jscon-schema
  - json
  - oas
  - openapi-spec
permalink: /blog/2021/02/18/openapi-specification-3-1-released
generated: true
---

OpenAPI developer community and JSON Schema community work together to build upgrade that supports 100% compatibility with the latest draft of JSON Schema

**SAN FRANCISCO – February 18, 2021 –** The OpenAPI Initiative, the consortium of forward-looking industry experts focused on creating, evolving and promoting the OpenAPI Specification (OAS), a vendor-neutral, open description format for HTTP (including RESTful) APIs, announced today that the OpenAPI Specification 3.1.0 has been released. This new version now supports 100% compatibility with the latest draft (2020-12) of JSON Schema.

Along with this release, the OpenAPI Initiative has sponsored the creation of new documentation to make it easier to understand the structure of the specification and its benefits. It is available here: [https://oai.github.io/Documentation/](https://oai.github.io/Documentation/)

The OpenAPI Specification is a broadly adopted industry standard for describing modern APIs. It defines a standard, programming language-agnostic interface description for HTTP APIs which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.

The OpenAPI Specification (OAS) is used by organizations worldwide including Atlassian, Bloomberg, eBay, Google, IBM, Microsoft, Oracle, Postman, SAP, SmartBear, Vonage, and many more.

“The benefits of using the OpenAPI Specification are broadly applicable, ranging from API lifecycle management, to documentation, to security, to microservices development and much, much more,” said Marsh Gardiner, Product Manager, Google, and Technical Steering Committee, OpenAPI Initiative. “Great care was taken in evolving to version 3.1.0 to ensure it is an incremental upgrade for existing users, while also making it an excellent candidate for immediate evaluation and adoption in corporate environments. We extend our heartfelt gratitude to the diverse group of contributors for all their exceptional skills and effort on our latest achievement.”

“The mismatch between OpenAPI JSON Schema-like structures and JSON Schema itself has long been a problem for users and implementers. Full alignment of OpenAPI 3.1.0 with JSON Schema draft 2020-12 will not only save users much pain, but also ushers in a new standardised approach to schema extensions,” said Ben Hutton, JSON Schema project lead. “We’ve spent the last few years (and release) making sure we can clearly hear and understand issues the community faces. With our time limited volunteer based effort, not only have we fixed many pain points and added new features, but JSON Schema vocabularies allows for standards to be defined which cater for use cases beyond validation, such as the generation of code, UI, and documentation.

On Day One of JSON Schema draft 2020-12 being released, two implementations were ready. It’s humbling to work with such an experienced and skilled team.”

While JSON Schema is still technically a “draft” specification, draft 2020-12 sets a new stable foundation on which 3rd parties can build standardised extensions. The JSON Schema team do not foresee any major changes to the approach of the extension system, like dialects and vocabularies. However, the utility may be improved as feedback is received.

JSON Schema website: [https://json-schema.org](https://json-schema.org)

JSON Schema Open Collective: [https://opencollective.com/json-schema](https://opencollective.com/json-schema)

JSON Schema Twitter: [https://twitter.com/jsonschema](https://twitter.com/jsonschema)

Major Changes in OpenAPI Specification 3.1.0

-   JSON Schema vocabularies alignment
-   New top-level element for describing Webhooks that are registered and managed out of band
-   Support for identifying API licenses using the standard SPDX identifier
-   PathItems object is now optional to make it simpler to create reusable libraries of components. Reusable PathItems can be described in the components object. There is also support for describing APIs secured using client certificates.

Full OpenAPI Specification 3.1.0 release notes are available here: [https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0)

A Note on Semantic Versioning

The OpenAPI Initiative had adopted semantic versioning to communicate the significance of changes in software upgrades. Semantic versioning is a popular numbering methodology where minor version updates indicate changes to software are backward compatible, whereas major updates are not. Technically, using semantic versioning with the new full alignment with JSON Schema would require this change to be denoted as 4.0.0. However, this update to OpenAPI important improvements, specifically the alignment with JSON Schema, but to force it into a major release numbering would have created a mismatch of expectations.

Special Thanks

A special callout to Henry Andrews, Phil Sturgeon, and Ben Hutton for all their work, support and patient explanations they have provided to better align JSON Schema and the OpenAPI Specification. Many thanks to Lorna Mitchell for driving the Webhooks effort, using our new proposal process. And thanks to the many, many open source developers involved worldwide.

OpenAPI Resources

To learn more about participate in the evolution of the OpenAPI Specification: [https://www.openapis.org/participate/how-to-contribute](/participate/how-to-contribute)

●   [Become a Member](/membership/join)

●   [OpenAPI Specification Twitter](https://twitter.com/OpenApiSpec)

●   [OpenAPI Specification GitHub – Get started immediately](https://github.com/OAI/OpenAPI-Specification)!

●   [Share your OpenAPI Spec v3 Implementations](/specification/v3implementations-form)

About the OpenAPI Initiative

The OpenAPI Initiative (OAI) was created by a consortium of forward-looking industry experts who recognize the immense value of standardizing on how APIs are described. As an open governance structure under the Linux Foundation, the OAI is focused on creating, evolving and promoting a vendor neutral description format. The OpenAPI Specification was originally based on the Swagger Specification, donated by SmartBear Software. To get involved with the OpenAPI Initiative, please visit [https://www.openapis.org](/)

About Linux Foundation

Founded in 2000, the Linux Foundation is supported by more than 1,000 members and is the world’s leading home for collaboration on open source software, open standards, open data, and open hardware. Linux Foundation projects like Linux, Kubernetes, Node.js and more are considered critical to the development of the world’s most important infrastructure. Its development methodology leverages established best practices and addresses the needs of contributors, users and solution providers to create sustainable models for open collaboration. For more information, please visit us at linuxfoundation.org.
