---
title: OpenAPI 3.1.0 RC0 – It’s here!
date: "2020-06-18"
wordpressId: 1525
author: darrmi
category: blog
permalink: /blog/2020/06/18/openapi-3-1-0-rc0-its-here
generated: true
---

How time flies! It is approaching three years since we released OpenAPI 3.0.0. During this time we have made a number of patch releases that were mostly minor clarifications and corrections. Today, however, is different.

Today, we are announcing the first release candidate of OpenAPI 3.1.0.

## Shiny stuff

Three of the bigger changes in this new version include:

-   A new top-level element for describing Webhooks that are registered and managed out of band. Many thanks to [Lorna Mitchell](https://twitter.com/lornajane) for driving this effort, using our new-fangled [proposal process](https://github.com/OAI/OpenAPI-Specification/blob/master/proposals/000_OAS-proposal-template.md) and regularly reminding us to focus on shipping.
-   Support for identifying API licenses using the standard SPDX identifier.
-   The PathItems object is now optional to make it simpler to create reusable libraries of components. Reusable PathItems can be described in the components object. There is also support for describing APIs secured using client certificates.

## A great alignment

While these enhancements (and many others described in our [release notes](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0-rc0)) address some of the most requested features by the OpenAPI developer community, they are outshined by the most significant improvement that we have made in OpenAPI 3.1.0. **This version of the OpenAPI Specification now supports 100% compatibility with the latest draft of JSON Schema.** This has been a significant effort between the OpenAPI developer community and the members of JSON Schema community. A special callout to [Henry Andrews](https://github.com/handrews), [Phil Sturgeon](https://twitter.com/philsturgeon), and [Ben Hutton](https://twitter.com/relequestual) for all their work, support and patient explanations they have provided.

## Small changes make a big difference

To the regular user of OpenAPI descriptions, the differences in the 3.1.0 Schema object may not be immediately apparent. In fact, v3.0.x descriptions will quite happily pass v3.1.0 validation.  Adopting the new capabilities can be done incrementally. There are many new capabilities that are possible with the latest version of JSON Schema, but we will leave those details for a later blog post.

## When minor changes are major

In the OpenAPI v3 specification we adopted [semantic versioning](https://semver.org/) to communicate the significance of the changes. Semantic versioning is a popular methodology that was created for managing software packages.  Minor version updates indicate that changes are backward compatible, whereas major updates are not. It is not obvious what backward compatible changes mean when talking about a specification. In v3.0.3 we [introduced language](http://spec.openapis.org/oas/v3.0.3#versions) to try and be precise about what it meant to be a backward compatible change.  We naively believed this would help.

When discussing the final details of aligning with JSON Schema, we identified there was particularly thorny issues with the [readOnly and writeOnly](https://github.com/OAI/OpenAPI-Specification/issues/1622) properties that are defined in JSON Schema but described to have slightly different behavior in OpenAPI. In order to achieve our goal of full alignment with JSON Schema, we had to drop the OpenAPI behavior. Technically, this change might “break” some piece of tooling out there. We haven’t found it yet (we’re still looking). Semantic versioning would insist that this change be denoted as 4.0.0. However, this update to the specification is not such a major update, rather there are a few small breaking changes.

A release of a 4.0.0 of the OpenAPI Specification would bring a set of expectations. Major version bumps generally also face adoption resistance. This update to OpenAPI is not a major update–it has some nice improvements, and we are now on a much better path with JSON Schema, but to force it into a major release would have created a mismatch of expectations.

This conundrum led the [Technical Steering Committee](https://github.com/OAI/OpenAPI-Specification/blob/master/GOVERNANCE.md) to force a vote on the issue, as we could not reach consensus for the first time. As you may have guessed, the final decision was to drop the requirements of semantic versioning. While opinions are still mixed on whether this is the right thing to do, this gives us the space in the future to better use major and minor version numbers that more accurately convey the significance of the version changes to the vast majority of users.

## Ta Da!

And so, OpenAPI 3.1.0 RC0 is ready for final review, and this is your invitation to comment before it graduates. After we resolve any final housekeeping issues, we will declare 3.1.0 done and Ship It!
