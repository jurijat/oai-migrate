---
title: Implementer’s Draft (OAS 3.1 RC1) Available for Feedback – Please Respond by Nov 8!
date: "2020-10-23"
author: openapi
category: blog
tags:
  - json
  - rc1
  - releasecandidate
permalink: /blog/2020/10/23/implementers-draft-aos-rc1-available-for-feedback-please-respond-by-nov-8
---

_Request to the community! Please review RC1, implement it, and share with us your feedback by November 8th. The final version should come shortly after that._

[Release candidate 1 (RC1) of OpenAPI Specification 3.1](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0-rc1), the Implementer’s Draft, is available for testing and evaluation.

The enhancements address some of the most requested features from the OpenAPI developer community. Specifically, the OpenAPI Specification is now fully compatible with the latest draft of JSON Schema. This has been a significant effort between the OpenAPI developer community and the members of the JSON Schema community.

Changes include:

-   A new top-level element for describing Webhooks that are registered and managed out of band. Many thanks to [Lorna Mitchell](https://twitter.com/lornajane) for driving this effort, using our new [proposal process](https://github.com/OAI/OpenAPI-Specification/blob/master/proposals/000_OAS-proposal-template.md).
-   Improved support for identifying API licenses using the standard SPDX identifier.
-   The PathItems object is now optional to make it easier to create indexes of reusable components. Reusable PathItems can be described in the components object. There is also support for describing APIs secured using client certificates.

## You can learn more about RC1 [here](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0-rc1).

Special thanks to [Henry Andrews](https://github.com/handrews), [Phil Sturgeon](https://twitter.com/philsturgeon), and [Ben Hutton](https://twitter.com/relequestual) for all their hard work and support.
