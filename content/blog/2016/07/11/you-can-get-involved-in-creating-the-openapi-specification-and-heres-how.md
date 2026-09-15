---
title: You Can Get Involved in Creating the OpenAPI Specification, And Here’s How
date: "2016-07-11"
author: marshg
category: blog
permalink: /blog/2016/07/11/you-can-get-involved-in-creating-the-openapi-specification-and-heres-how
generated: true
---

How is the OpenAPI Specification evolving? What’s the process? How can you get involved? Today we’ll try to answer those questions and shine a light on:

-   The [Technical Developer Community](/governance#TDC), why it exists and how it operates
-   The timeline and roadmap for the next major revision of the OpenAPI Specification

![Open API Logo](http://oapi.wpengine.com/wp-content/uploads/2016/10/OpenAPI_Pantone-300x80.png)

Last December, the Swagger 2.0 specification was donated by SmartBear and became the OpenAPI Specification (sometimes abbreviated OAS). The spec is 100% compatible, only sporting a new name and brand. Why was this important? In some ways it doesn’t—there was nothing “broken” before. However, in order for sometimes-competitive vendors to build support for the format into their products and to collaborate on an industry standard, they needed a neutral governance model. This is exactly why the Open API Initiative was created under the Linux Foundation in order to evolve what was once known as the Swagger specification.

![_meta_issue_specification_documentation_structure_and_supporting_docs_issue_589_oai_openapi-specification](http://oapi.wpengine.com/wp-content/uploads/2016/10/meta_issue_specification_documentation_structure_and_supporting_docs_issue_589_oai_openapi-specification-300x203.png)The Open API Initiative’s charter created, “an open source, Technical Developer Community (TDC), open to any participant, whether an OAI Member or not. ” The TDC is responsible for overseeing the evolution of the OpenAPI Specification. Today, the TDC has six members, and it will grow over time as individual members of the community step up to drive the format. The good news is that ever since the 2.0 specification was launched, people in the community have been offering suggestions for how to improve it. Many of those issues have been identified as candidates for the next major release—the challenge now is to decide what is in or out for the next version and to bring those changes to release candidate status.

In order to tackle the huge backlog of issues, [Tony Tam](http://twitter.com/fehguy), who founded Swagger and leads the TDC, identified a number of high level themes such as [Security](https://github.com/OAI/OpenAPI-Specification/issues/585) and [Protocols and Payloads](https://github.com/OAI/OpenAPI-Specification/issues/586), added references to the individual issues and then tagged them as [Meta issues for OpenAPI.Next](https://github.com/OAI/OpenAPI-Specification/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22OpenAPI.Next+Proposal%22+label%3A%22Meta+Issue%22) on GitHub. The single best way to understand the direction that the OpenAPI Specification 3.0 may take is to review those meta issues. Over the next few weeks, [Jason Harmon](https://twitter.com/jharmn), [Darrel Miller](https://twitter.com/darrel_miller), and [Marsh Gardiner](https://twitter.com/earth2marsh)will try to break down some of those issues with individual blog posts in order to explain some of the thinking behind them.

![clarification_about_yaml_by_fehguy_pull_request_635_oai_openapi-specification](http://oapi.wpengine.com/wp-content/uploads/2016/10/clarification_about_yaml_by_fehguy_pull_request_635_oai_openapi-specification-300x122.png)While the TDC strives to communicate through issues and pull requests, we’re all volunteers that steal time to work on OpenAPI. Sometimes it’s faster to have an hour long conference call, which we do every couple of weeks. In addition, we use the OAI’s Slack team to raise attention to questions or suggestions when GitHub notifications don’t get the job done. The changes proposed by a sub-issue in a meta issue result in a pull-request (PR), and that PR is then voted on by using a ![](https://openapis.org/sites/cpstandard/files/blogs/emoji_u1f44d.png) reaction on the issue.

How can you get involved? If you have a particular interest in a topic, search the existing issues and join the conversation or start one if necessary.

Some of those topics are philosophical, such as [Is OpenAPI an Open World or Closed World Contract?](https://github.com/OAI/OpenAPI-Specification/issues/568)Some of them are passionate, such as [Support for multiple request/response models based on headers](https://github.com/OAI/OpenAPI-Specification/issues/146). Other topics go deep into questions about [JSON-Schema](https://github.com/OAI/OpenAPI-Specification/issues/333) or the [YAML specifications](https://github.com/OAI/OpenAPI-Specification/pull/635). Over the next few weeks, we’ll post here on the blog about some of the meta-issues and sub-issues and give some insight into the nature of the discussions around them.

-   Follow the next post in this series: [Structural Improvements: explaining the OpenAPI spec 3.0, part 2](/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2)
-   Part 3 – [Request Parameters](/news/blogs/2016/10/tdc-request-parameters-explaining-30-spec-part-3)
-   Part 4 – [Protocol and Payload](/blog/2016/11/14/tdc-protocol-and-payload-explaining-the-3-0-spec-part-4)
-   Part 5 – [Documentation](/blog/2016/11/17/tdc-documentation-explaining-the-3-0-spec-part-5)

**—**
![Marsh Gardiner](http://oapi.wpengine.com/wp-content/uploads/2016/10/image1326746890-150x150.jpg)About The Author
Marsh Gardiner
At least two of the following three statements are true about Marsh: No one loves APIs more. He is a developer trapped in the body of a product guy. He hates writing bios.

In the semi-random walk of Marsh’s career, he has produced videogames for EA and Fox, created interactive learning environments, launched an educational non-profit organization, and fought bravely in the API wars of 2009-2018. At Apigee, he imagines a better future for apps and APIs.
