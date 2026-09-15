---
title: "TDC: Documentation, explaining the 3.0 spec part 5"
date: "2016-11-17"
author: jernstfriedman
category: blog
permalink: /blog/2016/11/17/tdc-documentation-explaining-the-3-0-spec-part-5
generated: true
---

_With the version 3.0 of the OpenAPI Specification nearing a beta candidate, this series of posts is meant to provide insight into what is changing and how from the perspective the Technical Developer Community (TDC). Earlier posts in the series described the_ [_background and rationale behind the next evolution of the spec_](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how)_, some_ [_Structural Changes_](/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2)_,_ [_Request Parameters_](/news/blogs/2016/10/tdc-request-parameters-explaining-30-spec-part-3)_, and [Protocol and Payload](/blog/2016/11/14/tdc-protocol-and-payload-explaining-the-3-0-spec-part-4)._

## **Documentation**

The huge variety of tooling that grew up around previous versions of the OpenAPI Specification suggests that those developers had access to the information necessary to build those tools. Not only should the 3.0 version continue that success, but with increased participation from the members of the TDC and community, the specification should be even more accessible, clear, and unambiguous than before.

### **Table of Contents**

![openapispec_tableofcontents](/img/uploads/2016/11/OpenAPISpec_TableOfContents.webp)
A table of contents has been added to the specification by [Rob Dolin](https://twitter.com/robdolin) in order to provide new readers a quick overview of the document structure, and it will make it easier to access relevant parts of the specification reference. As the spec changes begin to settle down, the documentation effort will pick up momentum, and the spec will become more accessible.

### **Common Mark**

The 2.0 specification used GitHub-Flavored Markdown (GFM) in order to provide rich text descriptions of services. Unfortunately, GFM has no formal specification itself, and some of its features work only for content hosted on GitHub. For this reason, the 3.0 draft of the OpenAPI Specification [has adopted the CommonMark format](https://github.com/OAI/OpenAPI-Specification/pull/720), which will enable tools to be more consistent in their rendering of Markdown. CommonMark is mostly compatible with GFM, so this change has little downside or impact on existing documentation. And with the detailed specification that CommonMark brings, the increased precision will have less ambiguity and should be a boon in general.

The next post will discuss other miscellaneous outstanding issues that have been raised by the community.

—
![Darrell Miller](http://oapi.wpengine.com/wp-content/uploads/2016/10/oai_blogauthor_darrellmiller.jpg)About The Author
Darrel Miller is a Senior Software Development Engineer on Azure API Management for Microsoft. Darrel is a member of the OpenAPI Specification Technical Developer Community. You can follow him on [Twitter](https://twitter.com/darrel_miller) or on his blog [Bizcoder](http://www.bizcoder.com/).
