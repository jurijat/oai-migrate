---
title: Announcing OpenAPI Overlay Specification 1.0.0
date: "2024-10-22"
wordpressId: 3563
author: openapi
category: blog
tags:
  - api
  - openapi
  - overlay
  - specification
permalink: /blog/2024/10/22/announcing-overlay-specification
generated: true
---

The OpenAPI Initiative is proud to announce the publication of the [OpenAPI Overlay Specification version 1.0.0](https://github.com/OAI/Overlay-Specification/blob/main/versions/1.0.0.md).

The Overlay Specification is an auxiliary standard to complement the existing OpenAPI specification. An OpenAPI description lays out API operations, data structures, and additional metadata to describe the shape of an API. An Overlay lists a series of repeatable changes to make to a given OpenAPI description, giving a way to apply transformations to OpenAPI descriptions as part of your API workflows.

This specification has been an implementer’s draft for some time, so you may find that your OpenAPI tooling already has or is planning support for Overlays. If you are already using Overlays then you should not see any material changes between an older implementation and the version of the release version. The recent updates aimed to complete the wording and clarify the specification to make it suitable for a formal 1.0 release.

## What is an Overlay?

An Overlay is a JSON or YAML file that follows the Overlay Specification and that contains a list of updates applied in the order they appear in the file. Updates might be to add a new value, overwrite an existing value, or remove something from an OpenAPI description.

The following code snippet provides an example of an Overlay encoded in YAML:

```
overlay: 1.0.0
info:
  title: Fix up API description
  version: 1.0.1
actions:
  - target: $.info
    update:
      title: Public-facing API title
      description: >-
        Description fields allow for longer explanations and support Markdown
        so that you can add links or formatting where it's useful.
  - target: $.paths['/secret'].get
    remove: true
```

The Overlay itself has high-level metadata in the `overlay` and `info` sections that follow the same semantics as an OpenAPI description and will be familiar to existing OpenAPI users. The `actions` array details each change to make to the OpenAPI, which is applied in order. In the first example above, the first action updates the `info.title` and `info.description` fields, while the second action removes the endpoint `GET /secret`.

A similar example that removes any Path Item that is not labeled to be published to customers, identified using a Specification Extension `x-customer-facing`, is shown in the following snippet:

```
overlay: 1.0.0
info:
  title: Fix up API description
  version: 1.0.1
actions:
  - target: "$.paths.*[?(@.x-customer-facing == false)]"
    remove: true
```

Both examples demonstrate the utility of Overlays, namely to make repeatable, deterministic updates to an OpenAPI description that can be automated throughout the OpenAPI toolchain. The means to apply automated updates is critical to supporting a robust API description pipeline, ensuring that your API community receives accurate and correct OpenAPI descriptions.

## Overlay Use Cases

There are several pain points in OpenAPI workflows that an Overlay could be helpful for.

### Improve Developer Experience

Your OpenAPI descriptions should be complete and ready for the target audience before publication. You can use an Overlay to add or improve the descriptions and examples that are provided in your OpenAPI descriptions. This is especially valuable where code is generated from a source that does not have a rich set of user-facing content already in place. Overlay provides a standard way to apply upgrades before publishing.

### Filter API descriptions

You should remove restricted, deprecated or experimental endpoints before sharing an OpenAPI. If you have a situation where an API operation or even an individual parameter cannot be properly described in the OpenAPI description because the audience is restricted or internal, then an Overlay can be implemented to remove it to provide a “safe” version of the description. You can provide one parent OpenAPI description and use filtering to create reduced versions for multiple audiences as needed.

### Translate API reference documentation

If you localize your documentation you can use Overlays to apply translations for the title, summary, and description properties and provide one OpenAPI description per target language. A repeatable translation option can help to keep the processes running quickly and easily. For APIs with global audiences, Overlay is especially valuable as repeatable translation work for APIs can be a tricky problem to solve, and often restricts how quickly your API can iterate.

### Add Tool-specific Content

For tools such as OpenAPI gateways, AI consumers, or SDK code generators, additional content in your OpenAPI descriptions can help get the best results. You can use Overlay to add that data at a later stage if you either do not have control over the input OpenAPIs themselves or if you do not want to feed one tool’s metadata to all other tools. You can apply the Overlay to enhance the OpenAPI description immediately before sending it to the tool that needs the transformed version.

There are many more use cases than the ones we have listed. We are looking forward to hearing more about how you use Overlays in your own work.

## Extending Overlays

The Overlay specification also includes an `extends` property so if one Overlay is specific to a single OpenAPI description, this optional field is used to indicate which one. The output of applying an Overlay to an OpenAPI description is … another OpenAPI description – so there are no restrictions on then applying another one!

An example of applying multiple separate Overlays to one API description could be where there’s an Overlay maintained by your technical writers that adds description fields for every operation, and another that makes all the examples of date properties update to a current date, so that all examples are always realistic and useful.

Similarly, one Overlay might be useful for multiple different OpenAPI descriptions, if the same transformation is useful for all.
Examples include applying the same license field to a series of OpenAPI descriptions, or adding an `x-internal` field on every path starting with `/admin`.

## Next steps

To find out more about Overlay please checkout the following resources:

-   There’s a [list of tools with Overlay support](https://github.com/OAI/Overlay-Specification?tab=readme-ov-file#tools-that-support-overlays) so you can try those out.
-   More [examples from the Overlay Specification](https://github.com/OAI/Overlay-Specification/blob/main/versions/1.0.0.md#examples) are available in its repository.

You can also get involved by following [the GitHub repository for the Overlay Specification](https://github.com/OAI/Overlay-Specification) or join the `#overlays` channel on the [OpenAPI Initiative slack](https://communityinviter.com/apps/open-api/openapi). We look forward to seeing you there!
