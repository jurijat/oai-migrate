---
title: Announcing Arazzo Specification version 1.0.1
date: "2025-01-24"
author: openapi
category: blog
tags:
  - api
  - api-description
  - arazzo
  - openapi
permalink: /blog/2025/01/24/announcing-arazzo-specification-version-1-0-1
generated: true
---

In 2024, the OpenAPI Initiative set a high bar for activity with the release of new specifications like Arazzo 1.0.0 and Overlay 1.0.0, along with two important patch versions of the OpenAPI Specification: 3.1.1 and 3.0.4. Today, we’re excited to kick off 2025 on a strong note by announcing the release of **Arazzo Specification [_version 1.0.1_](https://spec.openapis.org/arazzo/v1.0.1.html)**!

This 1.0.1 patch release introduces updates, clarifications, and expansions that refine the specification without altering its core functionality. While the way workflows are described in Arazzo remains unchanged, this release addresses areas where greater clarity was needed, improves examples for implementers, and corrects minor inaccuracies (as is typical with any initial 1.0.0 release).

Importantly, tooling built for Arazzo 1.0.0 will remain fully compatible with 1.0.1, as the patch release does not include any structural changes. This reflects our commitment to maintaining backward compatibility and supporting frequent, iterative improvements for the specification.

If you’re starting a new project or have the flexibility to upgrade, we highly recommend targeting Arazzo 1.0.1 as your version of choice!

### Summary of changes

The 1.0.1 release brings important clarifications, improved and corrected examples, and addresses minor inaccuracies in the initial 1.0.0 release. In addition, we’ve introduced a **non-authoritative JSON Schema representation** of the Arazzo Specification, making it easier for implementers to validate documents programmatically.

Here’s a quick summary of the notable changes in Arazzo 1.0.1:

-   **JSON Schema added** for the Arazzo Specification 1.0.x.
-   **JSON Schema test suite** for validation and compliance.
-   **Clarified the allowed types** for the retryAfter fixed field within the Failure Action object.
-   Improved clarity around the use of workflowId across the **Step**, **Success Action**, and **Failure Action** objects.
-   Adopted **RFC 9110** as the reference for Header Field guidance.
-   Adopted **RFC 9110** for payload (or request content) guidance.
-   Fixed inaccuracies and typos in field descriptions within the **Step Object** and **Parameter Object**.
-   Removed redundant references to event-based message properties from the **Runtime Expressions**.

### Upgrade process

For most users and tool vendors, no action is required—this patch release introduces only wording changes, clarifications, and corrections, with no structural changes to the specification.

That said, if you publish Arazzo tools or maintain workflows that rely on the specification, we recommend reviewing the [release notes on GitHub](https://github.com/OAI/Arazzo-Specification/releases/tag/1.0.1) to ensure everything aligns with your expectations. While the update should be seamless, it’s always a good idea to double-check for any changes relevant to your implementation.

### Looking ahead

As noted earlier, we anticipate relatively frequent updates to the Arazzo specification. To ensure smooth adoption, we recommend that tooling makers avoid locking into a specific patch version of the specification, as all patch releases will remain backward compatible.

Looking ahead, we’re already making significant progress on the upcoming Arazzo 1.1.0 minor release. The primary focus of this release is to introduce [_support for AsyncAPI_](https://github.com/OAI/Arazzo-Specification/issues/270), enabling workflows to span APIs that leverage both HTTP and event-driven protocols. This exciting development will expand Arazzo’s capabilities, making it a more versatile and comprehensive solution for modern API ecosystems.

![Timeline of Arazzo releases, showing version 1.0.1 at January 2025 and the next release at version 1.1.0 scheduled for mid-2025](/img/uploads/2025/01/Arazzo-1.0.1-diagram-1.webp)

**Timeline of Arazzo Specification Releases**

### Acknowledgements

This release would not have been possible without the contributions of our vibrant, community-driven ecosystem. The active engagement and stewardship shown by our contributors continue to inspire and drive the evolution of Arazzo. While it’s not possible to name everyone individually, we want to extend our sincere thanks to everyone who has suggested an idea, raised a constructive issue, opened or reviewed a pull request, or participated in our regular calls or discussions. Your efforts have been invaluable, and we deeply appreciate your support and commitment!

We’d like to give particular thanks to the Arazzo Specification editors, who have worked tirelessly to drive, coordinate, and prepare releases for the specification. A special word of gratitude goes to [Jeremy Fiel](https://www.linkedin.com/in/jeremyfiel/) for his excellent work in providing the JSON Schema for Arazzo, and to [Ralf Handl](https://www.linkedin.com/in/ralfhandl/) from the OpenAPI Initiative Technical Steering Committee, for his hands-on support and invaluable counsel in improving the infrastructural setup around the specification repository.

Thank you all for making Arazzo 1.0.1 a reality!

### Getting involved

There are many ways to get involved with Arazzo and the broader OpenAPI Initiative, and we’d like to hear from everyone who uses Arazzo (or wants to)!

-   Start with the [_OpenAPI Initiative website_](/) to find out about all our activities.
-   Your organization can [_become an OpenAPI member_](/membership/join).
-   All the standards and resources that we publish are developed in the open on GitHub. You can check out the [_Arazzo Specification_](https://github.com/OAI/Arazzo-Specification), the [_Overlay Specification_](https://github.com/OAI/Overlay-Specification), the [_OpenAPI Specification_](https://github.com/OAI/OpenAPI-Specification), or indeed the learning resources at [_learn.openapis.org_](http://learn.openapis.org) website.
-   You can improve your skills and knowledge with the free OpenAPI Fundamentals course on [_LF Training_](https://training.linuxfoundation.org/express-learning/openapi-fundamentals-lfel1011/).
-   Join one of our [_open meetings_](/calendar) to get involved with our next iterations.
-   Join our [_Slack workspace_](https://communityinviter.com/apps/open-api/openapi).

Author: [Frank Kilcommins](http://www.linkedin.com/in/frank-kilcommins)
