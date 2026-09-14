---
title: "Request Parameters: Explaining the 3.0 spec, part 3"
date: "2016-10-14"
author: jernstfriedman
category: blog
tags:
  - v3
permalink: /blog/2016/10/14/request-parameters-explaining-the-3-0-spec-part-3
---

_With the version 3.0 of the OpenAPI Specification nearing a beta candidate, this series of posts is meant to provide insight into what is changing and how from the perspective the Technical Developer Community (TDC). The first post described the_ [_background and rationale behind the next evolution of the spec_](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how)_, the second covered_ [_Structural Changes_](/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2)_, and the next few posts will address Protocol, Documentation, and other remaining open items._

## **Request Parameters**

In OpenAPI 2.0, all the pieces of the request message that can vary, including URL parameters, headers, and body, were described as a set of typed parameters. Experience has shown that mapping the description of a HTTP request body into the same set of metadata as query and header parameters presents a number of challenges. Today, let’s break down how this will affect the request body, content objects, and cookie parameters.

### **Request Body**

A new property [requestBody](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#requestBodyObject) has been added to the operation object. As a named property, this provides better distinction from and simplifies the parameter object, plus it makes it easier to describe the request body itself.

### **Content Objects**

OpenAPI 2.0 established a complex relationship between:

1.  Where response media types are declared
2.  Where response schemas and examples are defined

Multiple response media types could be defined globally but optionally overridden at the operation level. However, that provided for one schema to be defined per response object, though examples could be defined by media type, and/or one per schema. This made it difficult to define different schemas for different media types and to use different media types for different response objects.

To address this, the [content object](https://github.com/OAI/OpenAPI-Specification/pull/761) introduces a simple relationship between response objects, media types, and schemas. Each response object contains a single content type object for each supported media type. Each content type object has a single schema and an array of examples for that media type.

The content object is also used for the request body and works identically for describing the inbound payload. This has the magic result of removing the need for the produces and consumes arrays. Discussions are ongoing about whether to also leverage content objects to describe complex URL parameters and response header values.

These changes result in a path item with this structure:

![contentobjects](/img/uploads/2016/11/ContentObjects.webp)

### **Cookie Parameter**

While TDC members unanimously agreed that while using cookies is not a best practice for passing parameters, enough people had expressed the desire to describe existing cookied-based APIs that it warranted the inclusion of a new [parameter type](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#fixed-fields-9).

In the next post we will cover new interaction patterns to be supported and some planned changes for payload descriptions.

-   Part 1 – [Background](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how) and how to get involved!
-   Previous post in this series: Part 2 – [Structural Changes](/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2)

-   Next post in this series: Part 4 – [Protocol and Payload](/blog/2016/11/14/tdc-protocol-and-payload-explaining-the-3-0-spec-part-4)
-   Part 5 – [Documentation](/blog/2016/11/17/tdc-documentation-explaining-the-3-0-spec-part-5)
