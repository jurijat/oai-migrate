---
title: OpenAPI Moonwalk 2024
date: "2023-12-04"
author: marshg
category: announcement
tags:
  - openapi-spec
permalink: /blog/2023/12/04/openapi-moonwalk-2024
---

![An astronaut plants a flag with an OpenAPI logo on the moon.](/img/uploads/2023/12/openapi-moonwalk-1.webp)What comes next for the OpenAPI Specification? How will v4 improve on the success of OpenAPI v3? What can the spec help solve problems in the context of AI and LLMs?

As 2023 comes to a close, answers to these questions are beginning to take shape. With an aggressive goal of **launching v4 “Moonwalk” by the end of 2024**, it is going to be an exciting year.

Because there is so much work to be done, it was necessary to establish some guiding principles. After reviewing the major proposals and discussions of the last year, these are **semantics**, **signatures**, **inclusion**, **organization**, **upgrading**, and their order is important:

1.  1.  **🌖 Semantics provide purpose**. It is not sufficient to describe the mechanics of an API without also describing its semantics, whether the consumer is a human or an AI. Semantics join the what _(… does this do?)_ and the why _(… does this matter?)_ to the how _(… does this work?)_.

        OpenAPI has helped people build better APIs faster, and the ecosystem of tooling continues to deliver more value year after year. What is new today in 2023 is the rise of a new kind of API consumer—generative AI. LLMs can process OpenAPI descriptions and then use that API to solve problems. With generative AI’s ability to understand natural language, OpenAPI can help bring the power of APIs to non-developers with a level of accessibility never seen before. To fully realize this potential, API producers should decorate their mechanical descriptions of HTTP requests with details that convey the meaning and purpose of those API operations. This, in turn, helps both people and LLMs to achieve better results.

        To say this another way, people have been using squishy, natural language to talk to each other for centuries, and we’ve used crunchy, programming languages to talk to machines for decades. LLMs bridge the squishy and the crunchy worlds, which means that a huge number of people can use APIs who could not before.

        Regardless of your opinion of generative AI, from over-hyped to world-changing, we can expect that many people will be using OpenAPI to drive AI-based API consumers. If OpenAPI does not step up to address the needs of that community, they will find alternatives.

    2.  **🌒 Signature please!** An API represents a set of functions, each of which describes a client-oriented purpose. A function is identifiable by its signature, which correlates to a set of HTTP interactions. Moonwalk places this concept at its center.

        Any HTTP API is always a means to some end. API consumers prefer to reuse existing functionality, and ideally they can learn about that functionality in terms that are most natural to them. That a PUT/PATCH/DELETE returns a 200 or a 204 is an implementation detail that pales in comparison to the function it performs for the client. Today there are limited ways to express the signature of an API function in OpenAPI. A pathItem can’t use query parameters to distinguish operations. There can only be one operation per HTTP method. These are artificial constraints on the signature of the API functions due to the lack of a formal definition of the unique signature. Past efforts in OpenAPI have focused on enabling developers to describe HTTP APIs. This reprioritizes them so that developers can use OpenAPI to define API functions with unique signatures that then map each signature to HTTP mechanics.

3.  3.  **🌕 Inclusion needs a big tent**: Moonwalk aspires to describe all HTTP-based APIs. While it remains neutral on the design aspects of HTTP APIs, it recognizes the importance of having different design styles and opinions.

        Moonwalk should be able to describe the HTTP APIs that developers may already have as well as to design the APIs they may want to build. It should be able to accurately map the signature of an API function to an actual instance of an HTTP request and response provided by the API. Moonwalk does prefer resource-oriented API styles due to their overwhelming popularity, but it should be possible to describe purely RPC APIs, even when those API signatures are distinguished via HTTP header values or request body values.

4.  4.  **🌗 Organization through separation of concerns**. For example, the changing shape of an API should move independently of API deployments. API deployments may be secured with different security schemes. API functions’ signatures should not be tightly coupled to content schema formats.

        To support the growing customer base with diverse needs, the feature count will undoubtedly grow, introducing more complexity. To counterbalance this, we will apply more rigor to the modularization of different aspects of the API description. We will strive to eliminate ambiguity where it currently exists and leverage existing standards to minimize unnecessary novelty. Our goal is to provide a better experience for API description consumers, authors and tooling providers.

5.  5.  **🌑 Mechanical upgrading**. An important principle of OpenAPI v3 was that it offered a direct upgrade path from v2. Moonwalk carries this forward, which means that it must again be possible to mechanically upgrade to Moonwalk from v3 (and by extension, v2).

Important open source projects like OpenAPI depend on contributions from many people. If you are as excited as we are about the ideas above or about the opportunity to leverage AI to help APIs be used by more people, then please get involved! A great way to start is to join our weekly calls on Thursdays ([details](https://github.com/OAI/OpenAPI-Specification#participation)), and anyone who wants to join is welcome!
