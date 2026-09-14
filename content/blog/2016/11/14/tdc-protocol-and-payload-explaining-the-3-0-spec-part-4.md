---
title: "TDC: Protocol and Payload, explaining the 3.0 spec part 4"
date: "2016-11-14"
author: jernstfriedman
category: blog
permalink: /blog/2016/11/14/tdc-protocol-and-payload-explaining-the-3-0-spec-part-4
generated: true
---

_With the version 3.0 of the OpenAPI Specification nearing a beta candidate, this series of posts is meant to provide insight into what is changing and how from the perspective the Technical Developer Community (TDC). The first post described the_ [_background and rationale behind the next evolution of the spec_](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how)_, the second covered_ [_Structural Changes_](/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2)_, and the third discussed_ [_request parameters_](/news/blogs/2016/10/tdc-request-parameters-explaining-30-spec-part-3)_._

## **Protocol and Payload**

The OpenAPI Specification has had great success describing standard request/response HTTP APIs. However, many in the community have expressed an interest in describing distributed APIs beyond the simple HTTP model, such as WebSockets APIs, RPC APIs, Hypermedia APIs, and publish/subscribe APIs. After much discussion by the TDC, the goal is to extend the specification to some of these new use cases without adding significant complexity to the existing use cases.

### **Callbacks**

Webhooks leverage HTTP in an publish/subscribe pattern, and they have become a popular pattern among API providers, including Slack, GitHub, and many other popular services. Webhooks are simple to use and fit nicely into an existing HTTP-based style of API. However, one criticism of the OpenAPI spec was that it had no way to describe an outbound HTTP request and its expected response. The new callback object makes this possible. A [callback object](https://github.com/OAI/OpenAPI-Specification/pull/763) can be attached to a subscribe operation in order to describe an outbound operation that a subscriber may expect.

### **![Path Item Out Going](/img/uploads/2016/11/image01.webp)**

### **Links**

Many approaches for describing hypermedia APIs have been proposed to the OpenAPI repository on GitHub. A major problem is that a static description of resources in a hypermedia API runs counter to the runtime/discovery philosophy strengths of hypermedia APIs. Nonetheless, the ability to describe static relationships between resources in an API would have some benefit. To this end, the 3.0 draft specification introduces the [links object](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#linksObject) in order to describe which new resources may be accessed based on the information retrieved from an initial resource. This is not necessarily hypermedia-driven in that, the URLs to the new resources have not been embedded in the returned payload, but they are constructed based on rules defined in OpenAPI Specification. A new expression syntax has been introduced to allow information from a response to be correlated with parameters in the linked operation.

![Path Item Link Object](/img/uploads/2016/11/image00.webp)

The static description of links between resources should allow the generation of more useful documentation and client libraries that can encapsulate the process of traversing from one resource to another. This could allow client libraries that reduce the coupling between client applications and server-defined resource hierarchies.

### **JSON Schema**

A number of requests were made to expand the subset of JSON Schema that the OpenAPI spec allows to include more complex features of JSON Schema. In the 2.0 spec process, the potential tooling complexities around code generation prompted the exclusion of anyOf and oneOf. However, many users have requested relaxing that constraint, even though it would compromise tooling support for those features. This is one of the great challenges in spec design, and it is never easy when making choices like this to know whether it is better to give people sharp tools that they could cut themselves with, or to rely on experience to say no, the burden of this responsibility is too great. While OpenAPI 2.0 took the more conservative approach, the user base has grown more experienced, so [some of the restrictions are being lifted](https://github.com/OAI/OpenAPI-Specification/pull/741), and users will have to make smart choices.

### **Alternative Schemas**

With the improved support for non-JSON media types, the limitations of using only JSON schema to describe payloads is becoming more untenable. TDC is currently exploring options of how to enable describing the schemas of non-JSON payloads. If this challenge can be overcome, it may become possible to remove the form parameter type completely and to enable support for protocols like gRPC that use protobuf and protobuf schema.

_The next post will discuss some planned improvements to Documentation._

**—
![Darrell Miller](http://oapi.wpengine.com/wp-content/uploads/2016/10/oai_blogauthor_darrellmiller.jpg)About The Author**
Darrel Miller is a Senior Software Development Engineer on Azure API Management for Microsoft. Darrel is a member of the OpenAPI Specification Technical Developer Community. You can follow him on [Twitter](https://twitter.com/darrel_miller) or on his blog [Bizcoder](http://www.bizcoder.com/).
