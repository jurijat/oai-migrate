---
title: Announcing Arazzo Specification 1.1
date: "2026-05-19"
author: sensiblewood
category: blog
tags:
  - agent
  - ai
  - api
  - arazzo
  - openapi
  - workflow
permalink: /blog/2026/05/19/announcing-arazzo-specification-1-1
generated: true
---

We are proud to announce the release of Arazzo Specification v1.1.0!

The headline addition is AsyncAPI support — for the first time, Arazzo workflows can declaratively describe sequences of calls that span both synchronous and asynchronous APIs. A workflow can now call an HTTP endpoint, publish to an event bus, wait for an acknowledgment, and chain the result into the next step — all described in a single, machine-readable document. Beyond that, version 1.1 brings workflow composition improvements, precise data selection, and a set of clarification improvements that address real questions from practitioners who’ve been putting the specification to work. Here’s a quick rundown of the headline features.

### AsyncAPI Support

Arazzo 1.0 was built around OpenAPI. Version 1.1 opens the door to event-driven architectures by extending `sourceDescriptions` to include `asyncapi` documents alongside `openapi` and `arazzo` types:

```
sourceDescriptions:
  - name: PaymentsEventBus
    url: ./user-payment-events.asyncapi.yaml
    type: asyncapi
```

Async steps reference operations or channels from the referenced AsyncAPI document using `operationId` or `channelPath`. Each step declares an `action` — either `send` or `receive` — to make message flow intent explicit:

```
- stepId: WaitForUserAck
  operationId: $sourceDescriptions.AsyncAPIEventBus.receiveUserAck
  action: receive
  correlationId: $steps.GetUser.outputs.userCorrelationId
  timeout: 10000
  successCriteria:
    - condition: $message.payload.status == "ok"
```

`correlationId` links a request to its expected response and must align with the referenced AsyncAPI document. `timeout` sets the maximum milliseconds to wait before aborting the step.

Steps can also declare explicit ordering via `dependsOn` — a list of steps that must complete before the current step executes. `dependsOn` establishes prerequisite relationships; it does not trigger execution of the referenced steps.

### Chained Workflow Execution

Action Objects now fully support calling other workflows, with input mapping via the `parameters` fixed field. This enables clean composition of common patterns — token refresh being the canonical example — across larger workflow sequences:

```
name: retryStep
type: retry
retryAfter: 1
retryLimit: 3
workflowId: refreshTokenFlow
parameters:
  - name: refreshToken
    value: $inputs.refreshToken
  - name: clientId
    value: $inputs.clientId
criteria:
  - condition: $statusCode == 401
  - context: $response.header.WWW-Authenticate
    condition: '^.*[,\s]error="invalid_token".*$'
    type: regex
```

### Advanced Selector Support

The new **Selector Object** enables precise, fine-grained data extraction from structured data using `jsonpath`, `xpath`, or `jsonpointer`. `context` sets the root node, `selector` contains the expression, and `type` indicates the syntax:

```
outputs:
  userEmail:
    context: $response.body
    selector: $.user.profile.email
    type: jsonpath
```

The Selector Object is available across workflow outputs, step outputs, request body payloads, parameter values, and payload replacement values.

For cases requiring a specific expression version, the **Expression Type Object** (renamed from Criterion Expression Type Object) lets you pin both `type` and `version`:

```
type:
  type: xpath
  version: xpath-30
```

Supported values are follows:

-   `jsonpath`: `rfc9535` and `draft-goessner-dispatch-jsonpath-00`, defaulting to `rfc9535`.
-   `xpath`: `xpath-31`, `xpath-30`, `xpath-20`, and `xpath-10`, defaulting `xpath-31` .
-   `jsonpointer`: `rfc6901`.

### OpenAPI 3.2 Alignment

The Parameter Object gains a `querystring` option for the `in` fixed field, treating the entire URL query string as a single value. This aligns with the `querystring` feature introduced in OpenAPI 3.2 and allows complex query structures to be passed as a single mapped value:

```
- name: searchParams
  in: querystring
  value: "filter=active&sort=desc&limit=50"
```

```
- name: fullQuery
  in: querystring
  value: "category={$inputs.category}&minPrice={$inputs.minPrice}&inStock=true"
```

### Identity-based Referencing

To ensure unambiguous document resolution, Arazzo descriptions can now declare a `$self` URI at the root level. When referencing an Arazzo description by URI, implementations MUST use the target document’s `$self` value if present:

```
arazzo: 1.1.0
$self: https://api.example.com/workflows/pet-purchase.arazzo.yaml
info:
  title: A pet purchasing workflow
  summary: A workflow for how to purchase a pet through a sequence of API calls
  description: |
    Walks you through the workflow and steps of `searching` for,
    `selecting`, and `purchasing` an available pet.
  version: 1.0.0
```

This makes cross-document references portable and removes ambiguity in multi-workflow systems.

### Clarification Improvements

Version 1.1 also tightens several areas that generated questions in the 1.0 cycle:

-   **Complete ABNF grammar** for runtime expressions, with explicit clarity on string embedding
-   **Source Description resolution ordering** is now formally defined
-   **Truthy/Falsy evaluation semantics** for success criteria conditions are explicitly specified

### A Growing Ecosystem

The Arazzo tooling ecosystem has expanded significantly since 1.0. Editors, validators, parsers, resolvers, generators, and standalone workflow execution engines are all available and listed in the [Arazzo repository README](https://github.com/OAI/Arazzo-Specification). This complements the work being done on the [openapi.tools](https://openapi.tools/) website, who have also recently added the ability to list tools supporting the Arazzo Specification.

### What’s Next

The roadmap beyond 1.1 includes:

-   gRPC, GraphQL, SOAP, MCP, and A2A step support
-   Actor-in-loop (human or agent) support
-   Transformer and function support
-   Loops

### Get Started

Please checkout the following resources if you are new to Arazzo:

-   [Arazzo Specification v1.1.0](https://spec.openapis.org/arazzo/v1.1.0.html)
-   [GitHub Repository](https://github.com/OAI/Arazzo-Specification)

Our thanks to everyone in the community who contributed issues, pull requests, and feedback that shaped this release. Special thanks to Frank Kilcommins, [Nick Denny](https://www.linkedin.com/in/nickdenny/), [Kevin Duffey](https://www.linkedin.com/in/kmd/), [Naresh Jain](https://www.linkedin.com/in/nareshjain/), [Dmytro Anansky](https://github.com/DmitryAnansky), [Vladimir Gorej](https://www.linkedin.com/in/vladimirgorej/), and [Henry Andrews](https://www.linkedin.com/in/handrews/) for their significant contributions and feedback to this version.

**Contributors:** [Frank Kilcommins](https://www.linkedin.com/in/frank-kilcommins/)
