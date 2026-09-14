---
title: Meeting Orchestration Needs with Arazzo
date: "2024-05-29"
author: swaldron
category: announcement
tags:
  - arazzo
  - new-specification
  - openapi-spec
  - orchestration
  - workflow
permalink: /blog/2024/05/29/a-new-specification-from-openapi-arazzo
generated: true
---

**Today we are delighted to announce the release of Arazzo, a new OpenAPI Initiative specification designed to describe sequences of API calls to meet the orchestration needs of API providers and consumers.**

In a digital economy increasingly powered by APIs there is a need to accurately reflect the increasing complexity of the integration required to do business. Organizations calling multiple APIs to execute business flows and functions, sometimes across multiple service providers, require guidance and support to correctly implement sequences of API calls, with cognizance of success and failure at each step.

The Workflows Special Interest Group (SIG), part of the OpenAPI Initiative umbrella of specifications, has created the first release of the Arazzo Specification to meet the increasingly complex integration needs. Arazzo will allow API and integration service providers to build on top of OpenAPI Specification, providing information on sequences of API calls that comprise a flow or function.

**Using Arazzo API providers can:**

-   Link multiple operations, described through OpenAPI or other Arazzo descriptions, into one sequence of activities.
-   Provide criteria that describe success or failure based on the responses received from the APIs that API consumers call.
-   Implement variables that can carry dynamic variables from one API call to another, ensuring that data is successfully carried, as needed, through the context of the described sequence.

Like the OpenAPI Specification, the goal is to create a rich description language that can be used both for documentation and to automatically create integration code from machine-readable sources.

Frank Kilcommins, Principal API Evangelist at SmartBear and member of the Workflow SIG team, describes Arazzo as:

_**“An important milestone on the path to improved API maturity across the industry. By providing deterministic recipes for value-based usage of APIs, the Arazzo Specification, through its human- and machine-readable attributes, acts as living API documentation, reducing dependence on out-of-band onboarding guides. It ensures assertable qualities for API providers and regulatory stakeholders across the API lifecycle, while also empowering tooling vendors to craft the next wave of SDKs and code generators.**_

_The Arazzo Specification enables human API consumers to better understand how to use and combine APIs, focusing on their jobs to be done, thus reducing their mean time to integration. Concurrently, it offers a consistent and interoperable mechanism for the new wave of AI consumers to achieve expected API outcomes first and every time.”_

Arazzo will evolve as more organizations and tooling makers implement the specification. Please visit the specification [page](https://spec.openapis.org/arazzo/latest.html) and [repository](https://github.com/OAI/sig-workflows), or join our [Slack channel](https://open-api.slack.com/archives/C022K8VD7AP) for more information.
