---
title: Open API Initiative Announces Release of the OpenAPI Spec v3 Implementer’s Draft
date: "2017-03-01"
author: jernstfriedman
category: blog
permalink: >-
  /blog/2017/03/01/open-api-initiative-announces-the-release-of-the-openapi-spec-3-implementers-draft
---

About a month ago, we committed to pushing out the first Implementer’s Draft of OpenAPI Specification (OAS), and now it’s arrived! Following our official versioning scheme, this version is known as 3.0.0-rc0. This is a major step toward releasing a final version of the spec.

Until the final version is released, further development of the spec will continue in the [OpenAPI.next branch](https://github.com/OAI/OpenAPI-Specification/tree/OpenAPI.next). The 3.0.0-rc0 release has been [tagged](https://github.com/OAI/OpenAPI-Specification/tree/3.0.0-rc0) as a fixed reference.

![](/img/uploads/2017/03/image00-1.webp)

Since our [last blog post](/blog/2017/01/24/a-new-year-a-new-specification) we’ve resolved the remaining remaining structural changes to  the spec, and we have clarified a few issues and concerns and improved the documentation. Some notable changes since then are:

-   Finalized support for URL Templating.
-   Reworked support for ‘multipart/\*’ and ‘x-www-form-urlencoded’, changing how file uploads are handled, and removing the ‘file’ type and ‘formData’ parameter type.
-   Request bodies are now officially **not** supported for HTTP verbs where the behavior is undefined.
-   Clarified how relative URLs are handled as values.
-   Callbacks’ expression language has been reworked.
-   Examples documentation has been clarified.
-   Schema Object was updated to support ‘nullable’ for null transfer values and writeOnly properties were added as well.
-   Support for JSON Schema has been updated to version draft-wright-json-schema-00 (also known as Draft 05). Differences between the OAS implementation and JSON Schema have been clarified.
-   The Header Object was updated to follow similar standards to the Parameter Object. The Items Object was removed as a result.

At this point, the specification is “feature-complete”, meaning, we will not actively discuss adding support for existing tickets. In the next few weeks, we will close tickets that have been handled or mark them for future versions.

## What’s Next?

The Implementer’s Draft marks an inflection point in the push to the third generation of the specification. As we observed with version 2.0, the spec means nothing without tooling and the tooling means nothing without the spec. This draft means that all major changes have been made, and that tooling authors are encouraged to build against it, knowing that only small changes can be expected from this point forward. And just like with version 2, this is a great opportunity to be early and bring attention to your project. It is also a meaningful way to get involved with the OpenAPI community and to help drive the spec to its released state..

This means the ball is in your court. Here is how you can help:

-   Write your own tools to add support for the spec — it is an Implementer’s Draft after all. This is the only way that we can understand how well these changes are working  and that what is pushed out is usable and can be implemented fully. Working on such a tool? Let us know by filing an issue in the [OpenAPI Specification Repository](https://github.com/OAI/OpenAPI-Specification/)!
-   Find technical issues with the spec: contradiction between sections of the spec, features that don’t make sense, use cases we hadn’t taken into account. Make sure to follow up on the threads and PRs for the topic to see if there’s existing reasoning for the current implementation.
-   Find content issues in the spec: missing periods, typos, wrong examples, poor wording and so on.

The top contributors will be given a token of appreciation from the Open API Initiative.

As before, we may end up asking for contributions or feedback on specific tickets — those would be marked as ‘[help wanted](https://github.com/OAI/OpenAPI-Specification/issues?utf8=%E2%9C%93&q=label%3A%22help%20wanted%22%20)‘. Keep an eye on those, and don’t be afraid to jump into the discussion.

Thank you to everyone who has contributed to this substantial step forward and onward to a final OpenAPI Specification version 3.0.0 release.

#### Technical Developer Community

\[tmm name=”technical-developer-community”\]
