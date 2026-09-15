---
title: Tools That Support OpenAPI Specification
date: "2023-03-08"
author: openapi
category: blog
permalink: /blog/2023/03/08/tools-that-support-openapi-specification
generated: true
---

Over the last 18 months we’ve been looking at how we can better capture data on the OpenAPI ecosystem with particular focus on tooling – what tool makers are doing, what versions of OpenAPI they support and so on. Tooling registries obviously already exist in the wild such as [openapi.tools](http://openapi.tools). The goal was not replicate the functionality of these registries, but to industrialize the data collection process using a mechanism that was eminently extensible and could be expanded with very limited modification.

Introducing our [OpenAPI tooling registry](https://tools.openapis.org/). The registry exposes a “classic” UI based registry hosted at [https://tools.openapis.org](https://tools.openapis.org) that uses data automatically sourced from existing registries and uplifted with data collected from (as a first cut) the Github API. This mechanism was proven by Mike Ralphson and used to publish [https://apis.guru/awesome-openapi3/](https://apis.guru/awesome-openapi3/), and we’ve taken the approach and applied it to all Github projects we’re sourcing. We also provide the raw data as a means for users to “slice-and-dice” in ways they see fit or ways we haven’t thought of yet.

![](https://lh5.googleusercontent.com/0l8NsGer3d7a3AivJ1IRbH1iAJ5-151_OJWaIqe1XijwP98ec0T1MeQviXokIE-KnXVEpDiLi_ySgBfXHT-q8oQEXf1oZ_Qdf15LCPC9sABqWp-H_qKy4XmCkg_-o2m9hmsoi6rkkiKdETtDaMaOct8)

The sourcing and consolidation of the source data is wrapped by a build process written in Node.js that runs on Github Actions and collects new data on a daily basis. The data collection process itself is not wedded to a given data source. In our [source repository](https://github.com/OAI/Tooling/issues) we implemented the concept of “processors” that are tailored to a given source and then normalize the data to the registry format. As part of this process different tools are categorized using a Bayesian approach then attempts to put tools into the right “bucket”.

The repository as it stands is really just a first cut. There is more work to be done, with a [list of issues](https://github.com/OAI/Tooling/issues) currently focused on improving data quality, creating better categories and providing the data in a variety of formats. There is also an opportunity to use this data for outreach to tooling users, using it as an engagement tool to encourage them to both describe their needs and advance their tooling to the latest version of OpenAPI. There is also an opportunity to bring tooling data together across specification languages – GraphQL, Async API, JSON Schema _et al_ – to elicit a more holistic view of the API ecosystem and look at how cross-specification tooling might be of benefit.
As always feedback is welcome. If you have any suggestions for improvement please raise them [on the repository](https://github.com/OAI/Tooling/issues/new?assignees=&labels=&template=feature_request.md&title=) or get in touch if you’d like to talk in more detail about any aspect of the implementation.

* * *

## OpenAPI Resources

To learn more about participating in the evolution of the OpenAPI Specification: [https://www.openapis.org/participate/how-to-contribute](/participate/how-to-contribute)

-   [Become a Member](/membership/join)
-   [OpenAPI Specification Twitter](https://twitter.com/OpenApiSpec)
-   [OpenAPI Specification GitHub – Get started immediately](https://github.com/OAI/OpenAPI-Specification)!
-   [Share your OpenAPI Spec v3 Implementations](/specification/v3implementations-form)

About the OpenAPI Initiative

The OpenAPI Initiative (OAI) was created by a consortium of forward-looking industry experts who recognize the immense value of standardizing on how APIs are described. As an open governance structure under the Linux Foundation, the OAI is focused on creating, evolving and promoting a vendor neutral description format. The OpenAPI Specification was originally based on the Swagger Specification, donated by SmartBear Software. To get involved with the OpenAPI Initiative, please visit [https://www.openapis.org](/)

About Linux Foundation

Founded in 2000, the Linux Foundation is supported by more than 1,000 members and is the world’s leading home for collaboration on open source software, open standards, open data, and open hardware. Linux Foundation projects like Linux, Kubernetes, Node.js and more are considered critical to the development of the world’s most important infrastructure. Its development methodology leverages established best practices and addresses the needs of contributors, users and solution providers to create sustainable models for open collaboration. For more information, please visit us at linuxfoundation.org.
