---
title: Evolving OpenAPI in a Multi-Specification Initiative
date: "2024-12-05"
wordpressId: 3548
author: openapi
category: blog
permalink: /blog/2024/12/05/evolving-openapi-multi-specification-initative
generated: true
---

When people say “OpenAPI”, they are usually referring to the OpenAPI Specification, the API description language that helps us publish and consume APIs. The OpenAPI Specification is at the center of how the API community describes the shape of an API, allowing it to be readily understood.

However, you may not realize that the OpenAPI Initiative (OAI) has expanded beyond the core OpenAPI Specification. The needs of the API community have grown alongside the continued increase in scale of the API economy, and the community needs are reflected in the evolution of OAI to a multi-specification project. Our view of the world at the end of 2024 includes some significant developments over the last 12 months, with an equally exciting 2025 ahead. The OAI now incorporates the following projects:

-   OpenAPI Specification.
-   Arazzo Specification.
-   Overlay Specification.
-   OAS Comply.
-   Special Interest Groups (SIGs).

The tools, specifications, and groups that comprise the OAI project provide an increasingly large footprint of standards in the API economy. Their relationships are summarized in the diagram below, which shows how each tool, specification, or group fits into the OpenAPI ecosystem.

![The specifications and tools that comprise the OpenAPI Initiative](/img/uploads/2024/12/openapi-specification-family.webp)

Each of these provides features and functions important to the API community.

## OpenAPI Specification

The OpenAPI Specification is the center of the OAI and the focus of our efforts to support the API community. OpenAPI is the most widely used API description language in the API ecosystem, with arguably the longest legacy, and supports the publication and consumption of an innumerable number of APIs throughout the API lifecycle.

The OpenAPI Specification is undergoing active development with support from dedicated volunteers, with a new major version coming soon focused on the semantic improvement of the specification and supporting AI use cases. The OAI is constantly evaluating how we can improve the development of the standard, and provide support for tooling makers who are implementing the specification.

OpenAPI is currently at version 3.1.1, with multiple versions planned to harmonize the features of the Specification in readiness for version 4.0.0, our next major version codenamed “Moonwalk”. You can read more about version 3.1.1 on our [standards site](https://spec.openapis.org/oas/v3.1.1.html) and discover the goals of Moonwalk on [our blog](/blog/2023/12/06/openapi-moonwalk-2024). We also released [version 3.0.4](https://spec.openapis.org/oas/v3.0.4.html) in 2024, again in an effort to harmonize guidance across different versions.

## Arazzo Specification

The OpenAPI Specification was created to describe a single API and its supported operations. The API ecosystem has, however, grown significantly more complex as it has expanded, with a need to invoke multiple API operations across different API providers to complete a business operation. This growth in the interdependency of API operations has created a need for sequences of API calls to be described programmatically, which is why the Workflows Special Interest Group created the Arazzo Specification.

Arazzo is a description language that can reference multiple APIs, each described with an OpenAPI description or another Arazzo description, that provides API consumers with a rich view of complex, multistep workflows. Arazzo supports describing dynamic values, allowing API providers or API marketplaces to indicate how API operations relate to each other and the output and inputs that can be carried between each step. When supported by appropriate tooling this can significantly accelerate implementation time for API consumers and ensure they can handle sequences of API requests more accurately.

Arazzo is currently at version 1.0.0. You can read more about the Specification on our [standards website](https://spec.openapis.org/arazzo/v1.0.0.html).

## Overlay Specification

The OpenAPI and Arazzo Specifications provide the backbone of the OAI, with description languages aimed at supporting use cases across the API ecosystem. OAI is also creating complementary specifications that help API providers and consumers publish and consistently work with OpenAPI descriptions.

An example of these efforts is the [Overlay Specification](https://spec.openapis.org/overlay/v1.0.0.html), which is now at version 1.0.0. The Overlay Specification is intended to provide a consistent and deterministic way of applying updates to an OpenAPI description document. Example use cases include supporting multi-language API descriptions by using Overlays to contain language translations and including configuration information for different deployment environments in an OpenAPI description document.

## OAS Comply

[OAS Comply](https://github.com/OAI/oascomply) is an effort to develop tools to support tooling makers in implementing the OpenAPI Specification, with the potential to expand in the future to include the Arazzo Specification. The OASComply project was started in 2023 and was instrumental in understanding where the 3.0 and 3.1 specifications needed clarification.

The discoveries provided by OASComply motivated much of the work in the Open Specification 3.0.4 and 3.1.1 releases, as well as making compliance testability a major focus for Moonwalk. OASComply itself is on hold while we proceed with Moonwalk and figure out how compliance testability work might fit into our version 3 standards.

## Special Interest Groups

Finally, OAI has Special Interest Groups that are focal points in evolving specific use cases across industries, verticals, or technology requirements. SIGs are an important means for channeling support for new ideas and initiatives, and it speaks volumes that the efforts to create Arazzo, Overlay, and Moonwalk are focused through SIGs.

## The Future of the OpenAPI Initiative

The evolution of the OpenAPI Initiative has been largely organic and relied upon the endeavors of many dedicated volunteers. The members of the OpenAPI community have investigated, researched, discussed, and authored for thousands of hours to reach this point in the evolution of the OpenAPI Initiative.

Our next steps as an organization include:

-   Producing new versions of OpenAPI, including our next major version.
-   Maturing Arazzo and Overlay and helping tooling makers to support the specifications.
-   Expanding our support for both OpenAPI members and the community with investments in training, education, and certification.

If you are interested in helping develop the most important API description language on the Internet there is a _huge_ opportunity for you. Join our [Slack](https://open-api.slack.com) community to find out more.

Author: [Chris Wood](https://www.linkedin.com/in/sensiblewood/)
