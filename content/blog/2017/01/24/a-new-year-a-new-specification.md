---
title: A New Year, a New Specification
date: "2017-01-24"
wordpressId: 219
author: jernstfriedman
category: blog
permalink: /blog/2017/01/24/a-new-year-a-new-specification
generated: true
---

It has been an exciting journey, and we’re happy to announce that the OpenAPI Specification version 3.0 is coming into view!

[![Image from the most recent Meeting of the Open API Initiative Technical Developer Community Meeting](/img/uploads/2017/01/image00.webp)](https://github.com/OAI/OpenAPI-Specification/issues)

Image from the most recent Meeting of the Open API Initiative Technical Developer Community Meeting

Over the past year, the Technical Developer Community (TDC) has sifted through hundreds of tickets and thousands of comments — all with the goal of synthesizing community members’ requirements and improving the 2.0 specification to serve them. We have listened, debated, agreed, and disagreed, all the while keeping the spec simple and pragmatic yet still powerful. This next major milestone will be the first Implementer Draft, and it will be released on **February 28, 2017**.

## The Changes

Over the last few months, we’ve made announcements of the upcoming changes in the spec [via a series of blog posts](/specification/v3insights), talks, and of course, changes to the spec itself. Here is a brief recap of some of the more notable changes:

-   Rearranged the structure of the specification for easier and extended reusability.
-   Extended JSON Schema support to include \`oneOf\`, \`anyOf\` and \`not\` support.
-   Changed the structure of parameters to allow the use of schema in them.
-   Added support for Cookie parameters and eliminated dataForm parameters.
-   Body parameters were extracted to their own entity.
-   Added support for content type negotiation.
-   Introduced a new format to allow static linking between responses and future requests.
-   Simplified and enhanced security definitions of APIs.
-   Added a callback mechanism to describe WebHooks.

To help tool developers, we have also committed to semantic versioning of the spec. This means that any changes to it will trigger a version update, making it easier to manage and control.

## The Implementer Draft

After so much work that has gone into the specification, it is time for developers to begin to prove its use in real-world scenarios. As such, this Implementer Draft is an important step toward a final version. As this wider audience provides feedback and any resulting issues are closed, it will bring us to final release. This, today, is a call for you to start working with the specification and to help us ensure its accomplished its goals at the highest quality.

## Next Steps

This also means major changes to the specification should no longer be introduced. This does not mean that the specification is fully-ready, but we have begun focusing on cleaning up the documentation to help make the new spec more approachable.

So over the next few weeks, the TDC will concentrate on closing resolved tickets and marking tickets for future versions. We will also validate that the spec has all the information needed, including clarifications and examples where appropriate.

As a community member (yes, you!) please look for any tickets marked ‘[help wanted’](https://github.com/OAI/OpenAPI-Specification/issues?utf8=%E2%9C%93&q=label%3A%22help%20wanted%22%20), which indicate that assistance is needed to help resolve an open issue. As always, do not hesitate to submit additional tickets and PRs, regardless of the release status.
