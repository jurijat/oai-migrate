---
title: Moonwalk – 2025 update
date: "2025-02-05"
author: marshg
category: blog
permalink: /blog/2025/02/05/moonwalk-2025-update
---

Just over a year ago, we established a Special Interest Group (SIG) to explore how to evolve the OpenAPI Specification. We called this effort "Moonwalk," and we began by declaring our intentions in an initial [Moonwalk blog post](/blog/2023/12/06/openapi-moonwalk-2024). Since then, a group of committed contributors have met on [Tuesdays at 9am Pacific](https://github.com/OAI/sig-moonwalk/discussions/categories/announcements) to discuss these topics.

As we look to build momentum in 2025, we wanted to recap our progress so far. We added one more principle (#4 below) to the original five:

1.  **Semantics**: Semantics provide purpose, whether the consumer is a human or an AI.
2.  **Signatures**: An API operation is identifiable by its signature, which can be based on any aspect of HTTP mechanics.
3.  **Inclusion**: Moonwalk aspires to describe all HTTP-based APIs while remaining neutral regarding any specific design debate.
4.  **Foundational Interfaces**: Reduce the complexity for tooling authors by establishing standardized interfaces for parsing API description documents and defining consistent methods for expressing API structural semantics.
5.  **Separation of Concerns**: Modularization will keep the scope of Moonwalk manageable with loose coupling among concerns such as HTTP interfaces ("API shapes"), deployment configuration, and content schema formats.
6.  **Mechanical Upgrading**: An automated upgrade process from 3.x to 4.0 will be developed as part of the Moonwalk effort.

The new Foundational Interfaces principle would not have been possible without the work of Henry Andrews. His efforts to understand the OpenAPI compliance space led to a re-framing of why this is so difficult to achieve today and provided insights into what might need to change in order to make compliance tooling possible and more ([related post](https://modern-json-schema.com/analyzing-the-openapi-tooling-ecosystem)).

Another area of keen interest has been how semantics (principle #1) and signatures (principle #2) often intersect. Signatures represent a way to organize the functionality of an API, while semantics describe the purpose or meaning behind that functionality. As Large Language Models (LLMs) continue to reshape how people interact with technology, an OpenAPI description becomes even more useful for connecting these two parts.

Some insights from SIG discussions have helped to evolve the 3.x release line, as they were backwards compatible. Examples include enhancements to tags and the ability to make documents self-identifying to make it easier to support "external" references.

Last fall, two tooling authors joined to discuss their experiences in practice. Yusuke Tsutsumi spoke about the [aep.dev](https://aep.dev/) project, and Dave Shanley discussed [The Doctor](https://quobix.com/articles/introducing-the-doctor/) and related tools. These conversations were invaluable, and we hope to learn from others. Please comment on our agenda discussions if you are interested in talking about your experience as a tooling author using OAS.

The timeline for Moonwalk reaching a 4.0.0 release remains open-ended (as of this post in early 2025). The foundational progress made in 2024 would not have been possible without the work and enthusiasm of the regular contributors.

If you find these topics interesting, we hope you’ll join us in 2025! Get involved by:

-   Joining our channel on [Slack](https://open-api.slack.com/archives/C06A0RPNPGE).
-   Attending the weekly SIG meeting. See the weekly agenda posts in [GitHub Announcements](https://github.com/OAI/sig-moonwalk/discussions/categories/announcements) for more details.

We look forward to seeing you!

Author: [Marsh Gardiner](https://www.linkedin.com/in/marshgardiner/)
