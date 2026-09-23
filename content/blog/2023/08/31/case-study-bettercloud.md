---
title: >-
  Case Study: Using the OpenAPI Specification for Integrating SaaS Applications and Scaling Up to
  Hundreds of API Providers
date: "2023-08-31"
wordpressId: 2852
author: openapi
category: blog
permalink: /blog/2023/08/31/case-study-bettercloud
generated: true
---

_Guest blog post by_ [_Donald Atha, Software Architect, BetterCloud_](https://www.linkedin.com/in/donald-atha-41813323/)

![](/img/uploads/2023/08/1677520880279-1.webp)

One of the biggest challenges facing IT teams today is the increase in tedious and repetitive tasks driven by the explosive growth in SaaS applications over the last 10 years. Companies are using more and more SaaS products, which presents challenges when it comes to managing employee onboarding and offboarding, managing licenses and permissions, and resolving help desk tickets. At BetterCloud, we give IT teams the tools to reduce the amount of manual work on their plate with automations and configurable workflows. As the number of SaaS applications grows, our customers rely on our library of SaaS integrations to also grow.

Testing OpenAPI Generators for Rapid Integration

Recently the Innovation Team within BetterCloud, a team tasked with discovering and testing new capabilities that accelerate innovations, took on the challenge of prototyping a solution that would allow us to more rapidly integrate with various SaaS applications and scale that solution to onboard hundreds of API providers. The team agreed early on in order to reach the ambitions of the business, we would need to automate much of the process. The team also agreed that this would be possible because much of adding a new integration is the same and that the OpenAPI Specification would allow us to automate pieces of this by using existing community generators.

To fully understand the problem, it helps to understand what it means to add an integration at Bettercloud and a bit about our product. BetterCloud’s workflow engine automates processes like employee onboarding by detecting when a new employee is hired and subsequently granting access to the various SaaS applications required for their role. This onboarding scenario is just one of many use cases we support. All these use cases invariably necessitate ingesting and storing data from the 3rd party provider and updating the provider’s state. For instance, in the onboarding use case, the ingestion process fetches employee data, detects a change in status, and triggers the onboarding workflow. This workflow calls the provider’s APIs to create accounts or grant access to shared resources for the employee—functionality we internally refer to as “actions.”

When embarking on adding a new integration, BetterCloud begins by validating that the provider has the necessary APIs to support our use cases. This crucial step sets the stage for efficiently accessing required data and assessing whether the provider’s APIs are compatible with our action use cases. The OpenAPI Specification provides a consolidated view of this information.

Reducing the Amount of Code Written by Using the OpenAPI Specification

Once the API is understood, the next phase is implementing the ingestion logic. This phase involves calling the provider’s APIs to fetch and store all necessary data within BetterCloud’s infrastructure. The team has explored two methods to coordinate this, both leveraging the OpenAPI Specification. The intent with both approaches is to reduce the amount of code that a developer must write when adding a new integration. The first involves code-generating an HTTP client in Java using the [OpenAPI Java code generator](https://openapi-generator.tech/docs/generators/java/), while the other approach uses extensions to markup the spec, enabling the configuration of the ingestion logic. This marked-up spec feeds into a general-purpose engine that implements the logic based on the extensions. This covers the ingestion of data from the APIs, but once acquired, it must be stored to serve our applications.

BetterCloud utilizes a SQL database to store the entities we ingest. To create the schemas, the team employs the [OpenAPI MySQL generator](https://openapi-generator.tech/docs/generators/mysql-schema), Flyway, and Terraform. These tools facilitate the creation and configuration of a database for the new provider. The team was able to slightly modify the existing mustache templates of the MySQL generator in order to add our internal fields such as customer id. Since both the ingestion data models and the MySQL data schemas derive from the OpenAPI Specification’s entities, automation of this process becomes straightforward as the data models are aligned. With just an OpenAPI definition, we can generate a new database and its schemas at the click of a button in all of our environments!

Conclusion – Better Scaling the OpenAPI Specification, Better Value

We anticipate that this approach will allow us to bootstrap the ingestion portion of adding a new integration. By automating and code-genning common elements, the team can concentrate on the unique aspects of each new integration. Much like how we at BetterCloud automate workflows for IT teams to allow them to scale the impact of their work, the OpenAPI Specification has given us the tools to build our own automations that scale the value we can provide to our customers.
