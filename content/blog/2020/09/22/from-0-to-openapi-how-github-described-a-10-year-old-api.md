---
title: "From 0 to OpenAPI: How GitHub Described a 10 year old API"
date: "2020-09-22"
wordpressId: 1621
author: jesse
category: blog
permalink: /blog/2020/09/22/from-0-to-openapi-how-github-described-a-10-year-old-api
generated: true
---

_GitHub recently adjusted their extensive, old API in order to comply with current OpenAPI standards. At the API Specifications Conference we got the opportunity to hear how they accomplished this feat from leaders on the project._

GitHub recently released an OpenAPI description for their REST API. It is now easier than ever to integrate projects with GitHub data using simple, standardized API calls. However, the API team at GitHub faced many challenges in describing their massive API so that it would comply with OpenAPI specifications. At one point, their API had over 37,000 errors and 500 invalid operators!

The enthralling explanation of their unique solutions to these challenges is available [here](https://www.youtube.com/watch?v=5VGp7Kh0lGs).

A quick description of the OpenAPI Specification:

-   “The [OpenAPI Specification](https://www.google.com/url?q=http://spec.openapis.org/oas/v3.0.3&sa=D&ust=1600780912732000&usg=AFQjCNGNkA49FL2ig20INmcBT22MrTLvJQ) (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.”

GitHub adopted OpenAPI specifications for their API in order to automate SDK’s and documentation. Using OpenAPI descriptions also helps ensure a consistent developer experience for users of the API. Finally, implementation of an OpenAPI description simplifies and standardizes the system, freeing up GitHub’s API team to work on other aspects of the project.

GitHub Open Source REST API is available at the link below:

[https://github.com/github/rest-api-description](https://github.com/github/rest-api-description)

GitHub REST API Documentation:

[https://docs.github.com/en/rest/overview/resources-in-the-rest-api](https://docs.github.com/en/rest/overview/resources-in-the-rest-api)
