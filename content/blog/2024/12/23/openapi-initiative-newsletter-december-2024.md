---
title: OpenAPI Initiative Newsletter – December 2024
date: "2024-12-23"
wordpressId: 3709
author: sensiblewood
category: blog
permalink: /blog/2024/12/23/openapi-initiative-newsletter-december-2024
generated: true
---

Welcome to our December 2024 newsletter, the final OpenAPI Initiative roundup of the year! Our newsletter brings you initiative news, details of new versions of our specifications, and information on events and educational resources.

## Initiative News

In 2024 the OpenAPI Initiative (OAI) grew from one specification to three, with two new specifications added.

In May Arazzo version 1.0 was [released](/announcement/2024/05/29/a-new-specification-from-openapi-arazzo). If you’ve not heard of Arazzo, it is a description language for describing sequences of API calls, and supports passing of dynamic data between steps. Arazzo is an attempt for API providers to help describe such sequences in an increasingly complex API-driven world, in order to reduce onboarding time for developers implementing flows and reduce cost and complexity.

October also saw the [release](/blog/2024/10/22/announcing-overlay-specification) of the Overlay Specification at version 1.0. Overlay is a specification for describing updates to an OpenAPI description document in a consistent, deterministic way. Overlay helps API providers update their OpenAPI descriptions through the API lifecycle, and supports building pipelines for API descriptions, supporting automation. Overlay and automation can help organizations manage the publication of their OpenAPI descriptions more accurately, with increased quality, at lower cost.

Finally the OpenAPI Specification was also [uplifted](/blog/2024/10/25/announcing-openapi-specification-patch-releases) to versions 3.0.4 and 3.1.1. Being patch releases these releases did not introduce new features, but sought to clarify features of the 3.0 and 3.1 specifications with a significant amount of new and revised supporting guidance added to the specifications. Updates include extensive guidance on modeling parameters, headers, and form data, handling URL percent-encoding, parsing documents and resolving references, and choosing which fields to use for examples. The specification now also link to the extension registries, the JSON Schema for OpenAPI Description documents, and the Learn OpenAPI site.

Looking ahead to 2025 there are already plans afoot for new versions of the OpenAPI Specification.

At the end of 2023 we announced project Moonwalk with an ambitious goal of shipping a major release by the end of 2024. While v4.0 of the OpenAPI Specification is still some way off, we have learned a great deal and are now planning v3.2 and v3.3 as incremental steps towards v4.0 that will be fully backwards-compatible with v3.1.

Version 3.2 is intended to deliver a small set of new features quickly in 2025. Two of these features, (hierarchical, categorizable tags and self-identifying documents, which take much of the pain out of external references) emerged from the Moonwalk effort. While the scope will no doubt evolve, other features under consideration include streaming JSON formats, additional HTTP methods, device authorization flow, and links to OAuth authorization server metadata. This sounds like a lot, but aside from the changes with tags, most of these features are straightforward.

Work on v3.3 will start immediately after 3.2, and will deliver bigger ideas from Moonwalk. Two areas under consideration – a major streamlining of parameter, header, and form data modeling, and expanded OpenID Connect features – were 3.2 proposals that could not be done quickly. A v3.3 release, which has no date at this time, lets us take incorporate more Moonwalk ideas to solve these problems thoroughly.

As for v4.0 itself, the Moonwalk effort motivated us to understand how the OAS is implemented, and how to ensure that the specification truly represents the needs of the community. Henry Andrews summarizes this introspection in his [blog](https://modern-json-schema.com/analyzing-the-openapi-tooling-ecosystem), where he lays out an idealized architecture. Moonwalk will continue to progress in 2025.

The work on new specifications and specification releases, the increased adoption of 3.1, and the significant interest in Arazzo and Overlay all bodes well for another busy year in 2025. You can read more about OAI moving from one to three specifications and plans for next year in our [blog post](/blog/2024/12/05/evolving-openapi-multi-specification-initative) covering the changes in the initiative and what will come next in our evolution.

## Events

2024 was another great year for events, with our continued partnership with apidays plus an appearance at the [JAX Mainz Conference](/events/jax-mainz-2024). The OAI track appeared at apidays [Singapore](/events/apidays-singapore-2024), [New York](/events/apidays-new-york-2024), [Helsinki](/events/apidays-helsinki-2024), [London](/events/apidays-london-2024), [Australia](/events/apidays-australia-2024), and finally [Paris](/events/apidays-paris-2024), with a huge array of different talks ranging from introductions to Arazzo, views on how OpenAPI helps with API governance, and the role of OpenAPI in the geospatial ecosystem. The range of talks, together with generally packed conference rooms, are indicators of both the health and interest in the OpenAPI ecosystem, and in the strategic value of openness and open standards in general.

Looking ahead to 2025, we already have an OAI-supported event in the train at [DeveloperWeek](/events/developerweek-san-francisco-2025), where [Erik Wilde](https://www.linkedin.com/in/erikwilde/) and [Frank Kilcommins](https://www.linkedin.com/in/frank-kilcommins/) will be hosting the first OAI track of the year. Our OAI tracks have been features of apidays for the last two years, but DeveloperWeek brings the OAI to a large conference audience that is not dedicated to APIs. Broadening our reach and gaining the interest of communities outside the immediate API space will help widen the opportunity to attract new members who already use the OpenAPI Specification without even knowing it.

Outside the OAI tracks we also have TSC member [Lorna Mitchell](https://www.linkedin.com/in/lornajane/) presenting at FOSDEM 2025 with an [overview](/events/fosdem-2025) of the aforementioned expansion of OAI into three specifications. If you are planning or have a talk lined up on any aspect of OAI in 2025, let us know! We’d be happy to include it in the newsletter.

One other initiative we have started this year is our OpenAPI Hangouts, where members of the OAI community come together to discuss aspects of the specifications in a webinar style format, broadcast on LinkedIn and YouTube. We plan to expand these in 2025, covering more topics and engaging with more community members.

## Education and Training

We’ve also taken steps in 2024 in education and training, with some improvements and new initiatives designed to help the understanding of our specifications in the community.

Our [Learning site](https://learn.openapis.org/) continues to develop, with valuable resources for explaining OpenAPI in a narrative format. The site includes great resources that include a detailed walkthrough of references, examples of OpenAPI descriptions sourced from the community, and details from new specifications like Overlay.

Alongside our learning site, in 2024 we also created our OpenAPI Fundamentals course, an [online training course](https://trainingportal.linuxfoundation.org/learn/course/openapi-fundamentals-lfel1011/welcome/course-information) provided at Linux Foundation Training to increase awareness of the background, basic structure, and approaches to using the OpenAPI Specification. The course is available for free and provides a badge of completion.

We’ve also provided a number of in-person training courses, first at the Nordic APIs Platform Summit and then at apidays Paris. While participation in terms of number of attendees for these courses was mixed, they represented an important step in allowing us to investigate how we can better support the community for training and learning. We’ll continue to look for opportunities to support the community through in-person training in 2025, starting with a full-day workshop about “Practical API Management with OpenAPI” at DeveloperWeek in February 2025.

## Finally

That’s it for this newsletter, and 2024! We’ve achieved so much this year, and that is down to our great teams of volunteers who support the development of our standards. Thank you so much to our community and all the contributors who bring our specifications to life. Happy holidays everyone!

As ever, we welcome suggestions on how we can improve this newsletter or bring you information that can help make the most of how you use specifications published by the OpenAPI Initiative. We are also looking for ways to highlight OpenAPI Initiative member contributions to the community. Please get in touch on the [Outreach channel](https://open-api.slack.com/archives/C0KM0KXU6) on Slack if you would like to work with us to tell your story.

Contributors: [Chris Wood](https://www.linkedin.com/in/sensiblewood/), [Henry Andrews](https://www.linkedin.com/in/handrews/), [Erik Wilde](https://www.linkedin.com/in/erikwilde/), [Jeremy Fiel](https://www.linkedin.com/in/jeremyfiel/)
