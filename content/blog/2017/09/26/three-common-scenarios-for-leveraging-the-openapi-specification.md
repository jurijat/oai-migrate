---
title: Three common scenarios for leveraging the OpenAPI Specification
date: "2017-09-26"
wordpressId: 494
author: pjmolina
category: blog
tags:
  - openapi-spec
  - tutorial
permalink: /blog/2017/09/26/three-common-scenarios-for-leveraging-the-openapi-specification
generated: true
---

#### _This article is a short preview of the forthcoming talk “Designing APIs with the OpenAPI Specification” to be delivered at [Codemotion conference](https://2017.codemotion.es/), Madrid, Spain on November, 24th._

* * *

We, as developers, are surrounded by powerful and amazing APIs. Just finding the time to integrate the interesting services to enhance our product could be a daunting task just because **time** is the scarcest resource we have as developers.

API integration is a recurrent pain for developers because frequently we feel like frustrated plumbers trying to connect pipes of different sizes and materials, forced to create custom adapters and junctions over and over again. You already know the feeling, don’t you?

We are already living in fast times where the API-economy drives much of technology innovation. Platforms like Amazon, Paypal, Stripe, Heroku, and Google Maps to cite a few, are good examples of successful platforms and products that are leaders in their respective markets, creating ecosystems around them. If you own the ecosystem, you win the game. APIs have a story to tell: good APIs – easy to consume by third-parties  – can help further adoption. We, the developers as API consumers, decide in many occasion which APIs succeed and which ones are not used anymore.

In this context of rapid innovation, API discovery, and easy integration is key for every new service on town. In this field is where the OpenAPI Spec can help the most.

OpenAPI Spec provides a solid standard for describing interoperable REST APIs based on resources and HTTP. This description is useful for two types of audiences: humans and machines.

-   Humans use the specification as a source of API documentation, examples and as a guide to try out and understand the capabilities of the API. Easy of use is the key factor here for succeed.
-   Machines use the specification for creating code able to talk the service protocol in the language of your developments. Reducing in this way the hard plumbing work described before and minimizing the cost and needs for platform specific SDKs.

In my experience, there are three major use cases for using OpenAPI Spec on your API project: legacy APIs, contact-first driven, and server-first driven. Let’s review them one by one.

# 1\. Legacy API

![](/img/uploads/2017/09/10.legacy-api.webp)

The first scenario covers services and APIs that are already in production. Adding an OpenAPI document will formally capture the signature of the API in a standardized way. Therefore, consumers can use this contract as documentation to easily integrate with your API.

As long as you are using HTTP or HTTPS with JSON or XML encoding, it doesn’t matter what language or framework you choosed for the implementation: you have an interoperable API awaiting to be discovered by the world.

![](/img/uploads/2017/09/20.legacy-api-contract.webp)

The best thing here that surprise many people is: **you don’t have to change a single bit of your running API or service**. The metadata provided by the OpenAPI Spec is a contract stored in a self-contained file (YAML or JSON) you can share offline (as a file) or publish in any web server.

Adding the contract will not change a bit of your legacy implementation, but will help developers out there to try and consume your API.

# 2\. Contract-first driven API

To speed up developments, it is frequent to work in parallel in two teams: back-end and front-end. Both can build their stuff in parallel if they agreed to an API contract. Front-end people usually create and use mock-ups of the contract to be able to work without having to be waiting for the back-end to be ready.![](/img/uploads/2017/09/30.contract-first.webp)

OpenAPI and related tools here provide good tooling for this task. The OpenAPI contract can be edited and validated with no language or implementation assumptions (making the API really very, very interoperable).

Then, using OAS code-gen tools both teams can generate skeletons for the server-side and proxies for the frontend in any supported language or platform.

I recomend this way of working when the main functionality is clear enough to be able to design the contract up-front.

In the long-term you will maintain and evolve the contract in a planned manner. So this is the recommended approach in the long-run for a high quality API contract.

**Note:** _a clear versioning strategy is important in order not to break old clients when a new version arrive._

# 3\. Server-first driven API

In other type of projects, developers can decide to build their API directly on their favourite language and platform and derive the API contract later, as a direct consequence of the running implementation. This scenario is also supported by the OpenAPI Spec. An specific library for the target language is employed. Using reflection techniques and metadata to discover services, types, parameters directly inspecting the source code to automatically generate an OAS compliant spec on the fly.

![](/img/uploads/2017/09/40.server-first.webp)

This approach has some advantages:

-   Auto-generated documentation and contract.
-   Contract is always in sync with service implementation.
-   Agility in server-side development.

Major cons of the approach:

-   Be diligent when evolving the service, you could inadvertently break existing clients.
-   Derived contract could lack of simplicity or UX (if compared with a contract first). What is optimized for automation could be confusing for humans: design for humans.

NOTE: I recommend the server-first approach when the requirements and design is changing fast and your team is iterating to find the right contract design. Being not yet in production, this will alleviate breaking the clients. In any case, fully review your final API contract and refactor for a better UX before launching it.

# Conclusion

OpenAPI provides an interoperable way of describing an API:

-   formally enough to be consumed by machines and
-   KISS enough to be used by developers to document and learn the API.

The three scenarios described provide flexibility to fit with different project needs. Honestly, I think this is the main feature of the OpenAPI precursor, known as Swagger, got right from the very beginning: adapting well to very different development scenarios and different project development stages.

Software engineering is still a young discipline if compared with plumbing or electrical engineering. We need standards that helps us to deal with and automate repetitive tasks. That’s why, I think whatever you are, a machine or a human, exposing APIs with the OpenAPI Spec is a good thing to have in your public API!

If you liked this post and want to know more about it, join my talk at [Codemotion](https://2017.codemotion.es/) in Madrid at November 24th and let’s deep dive on it!

* * *

**About the author**

![](https://pbs.twimg.com/profile_images/591659923899056128/fF6V6E83_400x400.jpg)

Pedro J. Molina

[Pedro J. Molina](http://pjmolina.com/) holds a PhD. in Computer Sciences from the Technical University of Valencia. After working in different product companies related to Modeling and Code Generation he set up a startup called [Metadev](https://metadev.pro/) with focus on tooling for microservices and cloud development. Twitter: [@pmolinam](https://twitter.com/pmolinam)
