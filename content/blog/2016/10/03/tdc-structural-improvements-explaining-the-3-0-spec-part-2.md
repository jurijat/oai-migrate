---
title: "TDC: Structural Improvements: explaining the 3.0 spec, part 2"
date: "2016-10-03"
wordpressId: 131
author: openapi
category: blog
permalink: /blog/2016/10/03/tdc-structural-improvements-explaining-the-3-0-spec-part-2
generated: true
---

With the version 3.0 of the OpenAPI Specification nearing a beta candidate, this series of posts is meant to provide insight into what is changing and how. The [first post](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how) described the background and rationale behind the next evolution of the spec, and the next few posts will address the progress made by the Technical Developer Community (TDC) so far.

In an effort to organize the work, [six omnibus meta-issues](https://github.com/OAI/OpenAPI-Specification/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22OpenAPI.Next+Proposal%22+label%3A%22Meta+Issue%22) have been created:

1.  Structural improvements
2.  Request Parameters
3.  Protocol and Payload
4.  Documentation
5.  Security
6.  Path definitions

Over the next couple of weeks, we will describe each in order. Today, we’ll cover…

## Structural Improvements

The next version of OpenAPI will have some pretty significant changes—in semantic versioning terminology, this will represent a major change from 2.0 to 3.0. Since breaking change events happen rarely, they present the opportunity to make sweeping structural improvements.

Most importantly, with the OpenAPI Specification version 3.0, the overall structure of the document has been simplified:

### ![pasted-image-0](http://oapi.wpengine.com/wp-content/uploads/2016/10/pasted-image-0.png)

### New Version Identifier

One obvious place to begin the transition from the description that was once called Swagger 2.0 and is now known as the OpenAPI Specification? The version property that was called swagger from 2.0 will be replaced by an openapi version identifier. Going forward this [version identifier](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#fixed-fields) will follow the conventions of [semantic versioning](http://semver.org/), and therefore it will have three parts: major.minor.patch, which likely means 3.0.0. This also explains why the value is a string rather than a number, and it will allow for more controlled and identifiable changes to the specification in the future.

### Components Objects

OpenAPI 2.0 was somewhat inconsistent in the behavior of root-level properties. For example, some properties contained metadata that was applied globally to the API, while other properties were used as containers for reusable fragments of metadata to be referenced elsewhere. In order to clarify this and to minimize the number of properties at the root level, a new components property will be introduced. This [components property](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#components-object) contains only reusuable metadata that will be referenced elsewhere in the document.

### ![pasted-image-0-1](http://oapi.wpengine.com/wp-content/uploads/2016/10/pasted-image-0-1.png)

### Multiple Hosts

OpenAPI 2.0 allowed specifying a single host and basePath, and yet the schemes attribute allows specifying both http and https, therefore effectively enabling two hosts that only vary in the scheme. In the OpenAPI.vNext, the working branch of the spec repo, a new root level hosts object contains an array of objects that contain host, basePath, and scheme properties. By structuring this as an array of objects, any number of root URLs for the API can be supported, and it allows for a clearer correlation of the scheme, host, and basePath properties. It also reduces the number of root level properties required, simplifying the document structure.

![hosts](http://oapi.wpengine.com/wp-content/uploads/2016/10/hosts.png)

During the discussions around the GitHub issues and associated pull request, the TDC addressed the question of whether paths might be identified as representing different environments, such as dev, test, and production. However, this would have suggested that different hosts might point to different API implementations, and that was not the intent behind supporting multiple root URLs for the API. Rather, the goal was to allow a set of aliases to be defined for the same API. (Note: there remains an open issue concerning parameterization of the host and basePath, which might allow for pointing to different environments.)

Additionally, the host, basePath, and scheme may be overriden at the [path item](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#pathItemObject) level. This should make it easier to incorporate functionality provided on a separate host into an API description.

### ![pasted-image-0-2](http://oapi.wpengine.com/wp-content/uploads/2016/10/pasted-image-0-2.png)

### More Descriptive Options

The new specification allows users to describe their APIs in a more resource-oriented manner. Previously, descriptions of API behavior were defined at the operation level. For APIs designed in a resource-oriented way, documentation text would often read “GET a foo”, “POST a foo”, “DELETE a foo”. If the purpose of “foo” needed to be elaborated upon, it became necessary to somewhat duplicate that text for each operation. Now a [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#pathItemObject) can contain both a short summary text and a longer description text. The choice to provide additional description at the operation level is left up to the user, based on whether further explanation is required.

### Examples Object

The options for describing examples have been [significantly expanded](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#examples-object). The previous specification indicated that examples could only be described by a JSON or YAML object. Now, by using a JSON string, any format of example can be described. Additionally, a $ref object can be used to point to external files containing examples. The exact method of structuring examples is still in flux and may depend on whether the proposed content object is accepted by the TDC. The content object contains an array of example objects for defining a one or more examples for each media type.

As you can see, this one meta-issue about the structural changes has a lot to digest. The next post will discuss changes to how requests are described in OpenAPI 3.0.

-   Previous post in this series Part 1 – [Background](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how) and how to get involved!

-   Next in the series Part 3 – [Request Parameters](/news/blogs/2016/10/tdc-request-parameters-explaining-30-spec-part-3)
-   Part 4 – [Protocol and Payload](/blog/2016/11/14/tdc-protocol-and-payload-explaining-the-3-0-spec-part-4)
-   Part 5 – [Documentation](/blog/2016/11/17/tdc-documentation-explaining-the-3-0-spec-part-5)

—
![Darrell Miller](http://oapi.wpengine.com/wp-content/uploads/2016/10/oai_blogauthor_darrellmiller.jpg)About The Author
Darrel Miller
Darrel Miller is a Senior Software Development Engineer on Azure API Management for Microsoft. Darrel is a member of the OpenAPI Specification Technical Developer Community. You can follow him on [Twitter](https://twitter.com/darrel_miller) or on his blog [Bizcoder](http://www.bizcoder.com/).
