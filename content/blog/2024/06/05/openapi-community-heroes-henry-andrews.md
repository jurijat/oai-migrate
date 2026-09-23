---
title: OpenAPI Community Heroes – Henry Andrews
date: "2024-06-05"
wordpressId: 3335
author: swaldron
category: blog
tags:
  - api-description
  - json
  - openapi-hero
  - openapi-spec
permalink: /blog/2024/06/05/openapi-community-heroes-henry-andrews
generated: true
---

This is the first in our series of features on people we consider OpenAPI community heroes. These people go above and beyond to contribute to the OpenAPI Specification (OAS), Special Interest Groups (SIG), or across the OpenAPI Initiative.

Our first hero is [Henry Andrews](https://modern-json-schema.com). Henry is a key figure in the OpenAPI community, with a long background in API design and contributions as a standards author to both OpenAPI and JSON Schema. His background knowledge of the intricacies of HTTP and JSON Schema means he is an invaluable resource in the creation and maintenance of our standards, and he is intimately involved in the process of creating new versions, both in the [Moonwalk SIG](https://github.com/OAI/sig-moonwalk) and minor and patch release to version 3.x of the OpenAPI Specification. Henry is also a frequent contributor to GitHub Discussions across different OpenAPI versions, and his wealth of experience helps provide many rich and provocative debates.

We asked Henry some questions to discover more about his motivations, goals and hopes for the future of the OpenAPI Initiative.

**What drives your interest and involvement in the OpenAPI Specification?**

_A little over a decade ago, I more-or-less accidentally became the standards expert for REST APIs at my then-current job.  And I decided I really liked that niche.  OpenAPI fits that niche, and I know my contributions will have a broad impact.  I have also always enjoyed working with folks in this project and community.  I’ve been able to both contribute a lot and learn a lot from others which is ideal!_

**What do you consider to be your most significant personal contribution to the development of OpenAPI?**

_I drove a lot of the work to align version 3.1 of the OpenAPI Specification with JSON Schema draft 2020-12.  The divergence between OpenAPI and JSON Schema (the “superset-subset problem” as Phil Sturgeon dubbed it) had been a major pain point for users and tool developers._

_Restoring compatibility also brought in many new-since-draft-04 JSON Schema features that I’d worked on with that project, particularly in the areas of schema extensibility and re-use._

**What do you see as the most exciting proposed features of version 4 of OpenAPI?**

_Better multi-document support!  External referencing has never been consistently implemented, and we’ve learned a lot from that.  APIs are getting bigger, and reusing more components.  Industry standards groups are even designing components to be shared across multiple APIs._

_OpenAPI 4 will have a consistent multi-document model that is easy to implement, understand, and use.  Although don’t ask me what it looks like, yet!  We’re still hammering out the details._

**How will the Arazzo Specification benefit the development of the OpenAPI Specification?**

_Arazzo brings an increased focus on modularity and re-usability.  An Arazzo workflow can span multiple API providers which are likely to work with similar concepts._

_I think the combination of Arazzo and the industry-standard shared components I mentioned earlier will teach us a lot about how OAS 4 needs to support identifying and using common components.  Automating workflow use with Arazzo will be much easier if the APIs in the workflow represent the same concepts the same way.  We have a new Industry Standards Special Interest Group that I hope will really dig into this area._

**What do you see in the future for the OpenAPI Specification?**

_In the near future, I’m hoping that the 3.0.4 and 3.1.1 patch releases will show our community that the OpenAPI Initiative is active and listening to their concerns.  They won’t add anything new, but they’ll answer a lot of questions that piled up in the backlog while the project was less active._

_Longer-term, I’m hoping that Arazzo and Moonwalk (OAS 4) will help move the API design focus more toward how and why APIs are used.  So much API design work gets stuck in the weeds of URL templates, query parameter encodings, or deciding which HTTP method(s) to use for writes.  But the value of APIs comes from what you can do with them more than how they work._

**What other standards developments do you consider particularly significant for the API economy?**

_OpenAPI 4 is being designed with AI usage in mind.  This makes the question of AI standards particularly important.  Standards have historically been written so that humans know exactly how to implement and use them.  How does that change if an AI is the user?_

_The Semantic Web standards formalize semantics for programmatic use, and are particularly important for IoT.  But they’ve remained a niche because it’s very challenging to nail down semantics to that degree, and you need to know several complex standards to really make use of the Semantic Web._

_In theory, LLMs should be able to glean semantics from much less structured data, but that also introduces room for errors.  Where is the balance between trying to nail everything down with mathematical rigor and relying on AI to figure things out?  There probably need to be some standards about how to \_reliably\_ inform LLMs of important things without having to lock down every bit of meaning._

**Should more people get involved in developing the OpenAPI Initiative specifications and why?**

_Yes! I particularly want to encourage folks who can help with all of the work that we have in addition to writing the actual specification.  We need to add more examples and documentation on the Learn OpenAPI site, and we also need updates to things like our contributor guide.  There’s work for a wide range of skillsets, but it’s not as obvious to potential volunteers that we need those skills._

_Of course, we also welcome folks who want to contribute to the spec.  I’d love to get more user \_and\_ implementer perspectives on the PRs I’ve been submitting.  Sometimes those of us who have been working on the spec for a long time could benefit from feedback from the folks who will need to put the spec into practice once it’s out!_
