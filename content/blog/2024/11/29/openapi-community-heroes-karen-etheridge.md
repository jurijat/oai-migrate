---
title: OpenAPI Community Heroes – Karen Etheridge
date: "2024-11-29"
wordpressId: 3636
author: openapi
category: blog
tags:
  - community
  - hero
  - openapi
permalink: /blog/2024/11/29/openapi-community-heroes-karen-etheridge
generated: true
---

Welcome to the next installment of our series of posts on people we consider to be heroes of the OpenAPI community. These people go above and beyond to contribute to the OpenAPI Specification (OAS), Special Interest Groups (SIG), or across the OpenAPI Initiative.

Our next Community Hero is Karen Etheridge. Karen is a regular OpenAPI Specification contributor and describes herself as a “general busybody”. Karen told us about what drives her involvement in OpenAPI and what she hopes to see in Moonwalk.

## What drives your interest and involvement in the OpenAPI Specification?

As a long-time backend software developer, I’ve worked with HTTP/REST APIs in several projects. A few jobs ago, we started defining our APIs with internally-developed code to use hooks in the dispatch process to perform data validation; as I pulled these data definitions out into formalized JSON Schemas, I discovered that the ecosystem for JSON Schema validation was incomplete, so I published my work to open source, as [JSON-Schema-Modern](https://metacpan.org/dist/JSON-Schema-Modern).

A few years ago I was invited to join the Technical Steering Committee for the JSON Schema specification (json-schema.org), where I helped edit the latest release, draft2020-12, and where we’re now working on putting together revisions for the next release.

As part of my work in a later job, I moved into the OpenAPI space and built a new implementation of the OpenAPI v3.1 specification to perform validation of HTTP requests and responses, publishing that as [OpenAPI-Modern](https://metacpan.org/dist/OpenAPI-Modern). As I worked through this implementation I had many questions and observations about the spec, so this naturally led me to talking to the OpenAPI teams and community; shortly after, I began submiting improvements to the specification itself, and was subsequently pulled into a reviewer team for the specification and schemas. No good deed goes unpunished! 🙂 And now, this autumn, we’ve just gotten versions 3.0.4 and 3.1.1 out the door, and are now talking about changes for the upcoming 3.2 and 4.0 versions!

## What do you see as the most exciting proposed features of version 4 of OpenAPI?

A lot of OpenAPI 4.0, codenamed Moonwalk, is still up in the air right now, so now is a perfect time for people to jump in with their opinions and requests! We’re working through the way requests and responses are expressed in OpenAPI and thinking about whether the current “shape” makes sense, and what modifications we need to make tooling easier. We’ve been throwing around the terms “ontology” and “taxonomy” a bit, and thinking about what these concepts mean for OpenAPI descriptions.

One thing that has come up regarding the current document structure is the oddity between expression of request parameters in a list (with the “name” property adjacent to all other properties), and response parameters as an object (with the “name” as the property name, one level above all other properties). Expressing parameters (such as request headers) in a list doesn’t really make sense, because HTTP headers don’t have a natural order, but also it’s convenient to group all header properties together, rather than having the “name” be at a different level. So we haven’t quite yet worked out what to do here.

One thing on my radar that I want to address in Moonwalk is the way multipart requests and responses are expressed in OpenAPI — the way the structure is described in the HTTP RFCs doesn’t really match how the current OpenAPI specification models them, so I think there are some improvements to be made there. They’d be backwards-incompatible, so these changes would have to be in version 4, not 3.2.

## What do you see in the future for the OpenAPI Specification?

The Arazzo Specification and Overlays (both with a 1.0 version hot off the presses) look really promising, although I haven’t had much of a chance to dive into them yet. The ideas behind Arazzo are really interesting, as up until now each API is defined in a description wholly separate from every other API, whereas Arazzo workflows will tie them together and show how multiple APIs are related to each other. This will really help future low-code applications that drive their API calls directly from OpenAPI descriptions. The more sophisticated we can get with describing the full flow of an application, the more automatic code generation we can do, which is great for programmer productivity.

## Should more people get involved in developing the OpenAPI Initiative specifications and why?

Absolutely! We need to hear from the community so we know what we should work on next. How are you using OpenAPI in your projects, and where would you like to use it more? We’d especially like to know what things you find difficult or confusing, or perhaps types of APIs that you find difficult to express right now.
We do hear from users from time to time that are frustrated that their favourite software suites or IDEs aren’t fully OpenAPI 3.1-compliant, so if tooling vendors have any roadblocks here, we really want to know, so we can help.

Additionally, we love hearing about new tools that do things we didn’t expect, and what other things we could be capturing in OpenAPI descriptions that we haven’t thought about yet. Let us know what you’re doing and we’ll showcase you on our Tooling page! (https://openapi.tools)
