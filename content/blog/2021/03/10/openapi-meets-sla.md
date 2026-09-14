---
title: OpenAPI meets SLA
date: "2021-03-10"
author: abringaze
category: blog
permalink: /blog/2021/03/10/openapi-meets-sla
generated: true
---

_This post is authored by Dr. Pedro J. Molina, Founder at Metadev & Member at ISA Group, University of Seville_.

_The Special Interest Group on SLAs inside OpenAPI is working to create an extension to define Service Level Agreements for API._

_The latest work of the group was recently presented to the OpenAPI Technical Steering Committee for feedback and to ensure alignment with general policies._

_The SLA4OAI working group needs your help to begin realizing these benefits in practice as an extension to the OpenAPI Specification. This post will explain what an SLA is, why it matters, and how new tooling can help solve important problems faced by all API providers today._

## **What is an SLA?**

SLA is short for **Service-Level Agreement**, and it defines a set of **metrics** and constraints regarding service **availability**, **quality** of the service like minimal and maximal throughput, **latency**, **quotas**, **rate-limits**, etc.

Such constraints are applied to specific endpoints or operations (**resources**) inside an API.

These constraints can optionally be grouped in several **plans** and can have **price**.

![Diagram showing SLA as the starting point with branches to a Plan, which decomposes to Pricing, Availability, Rate, and Quota, and a separate path to Metrics and Resource/Endpoint. The paths converge.](/img/uploads/2021/03/SLA-concepts.webp) _SLA relation to Metrics, Constraints, and Plans_

## **The problem to solve**

The API industry adopted OpenAPI to move from an informal to a formal definition of APIs that can be consumed by humans for documentation and machines for automation.

In the same way, commercial APIs often have an SLA described in informal language published over HTML pages or PDF docs, hardly usable by machines.

Therefore, a need for a standard to help to describe SLAs is pretty clear.

## **Use Cases with APIs**

Having a standard format to describe SLAs for APIs will enable the following Use Case scenarios, to cite a few:

1.  SLA Documentation: to describe the limits, rates, quotas and expected availability, and how they apply to different endpoints.
2.  Description of Plans and prices: explaining different usage plans and costs.
3.  Feature and Cost comparison based on (2): allowing the comparison of alternative APIs based on availability and quality features.
4.  SLA Testing tools: to check if a given limit is applied by the API as documented.
5.  SLA Measure: to check the metrics are inline with the SLA contract declared.
6.  SLA Enforcing: to implement quotas and limits as a middleware for an API.
7.  SLA compliance tracking (globally or per user): to measure the degree of real compliance of an API with the SLA respect to the theoretical one.
8.  Automatic calculation of combined SLA for composed services. Several API can be used together to create complex services. SLA properties for the composition can be derived from the expected SLA from the simple components.
9.  Easy setup of SLAs in API Middleware tools. Some Middleware tools provide features to implement SLA concepts like metrics,  limits, quotas, rate limits, etc. Having a standard & formal way to define it will simplify the initial configuration of such features.

## **Current Specification**

After months of work the Special Interest Group (SIG) generated the consensus to create a minimal version 1.0 for people to start using and for providing feedback.

You can take a look at the complete [SLA specification](https://github.com/isa-group/SLA4OAI-Specification/blob/main/versions/1.0.0-Draft.md).

## **Early feedback, roadmap, and open issues**

SLAs definitions have an entity per se to be described in an stand-alone document apart from your OpenAPI definitions. For example, APIs described with AsyncAPI may also benefit from SLA descriptions.

Some open design questions where we would appreciate community feedback include:

1.  What is the best way of representing SLA information? There is an open discussion about if we should extend the OpenAPI document directly or if we maintain the document apart and then use references to API operations. This can be achieved using different techniques like embedded extension, patch/merge mechanisms, overlays. All of them provide pros & cons. Therefore, we are evaluating trade-offs here.
2.  SLA definitions need to reference endpoints. REST endpoints contain a URL plus a HTTP Verb (or alternatively, can be referenced by an OperationId). AsyncAPI operations will differ for sure. A reference mechanism needs to be chosen to allow pointers to specific API operations at OpenAPI, AsyncAPI or others.
3.  Usually constraints and policies apply to a set of endpoints. Instead of enumerating all of the endpoints one by one, a mechanism based on globbing (\*), or Regular expressions would be very useful to briefly describe all the endpoints affected by a given limit. OpenAPI **tags** were also suggested as a way to apply the limits.

## **Call for Implementers**

Time for action has arrived!

Implementers can start building new exciting tools targeting today problems that can put in practice the usage of the extension to show its usefulness. Inside the SIG we will start also doing so very soon just to show a couple of examples of use.

So if you are interested, please feel free to ask for details and reach out to the SIG about your plans to implement it. We plan to maintain a list of related tools using the SLA spec.

## **To know more**

1.  [Current SLA4OAI Spec](https://github.com/isa-group/SLA4OAI-Specification/blob/main/versions/1.0.0-Draft.md)
2.  [Wiki and working drafts](https://github.com/isa-group/SLA4OAI-TC)
3.  [SLA-SIG Mail List](https://lists.openapis.org/g/sla)
4.  SLA4AOI Presentation at TSC: [slides](https://t.co/Co2lW7eWMu?amp=1) & [YouTube video](https://youtu.be/IVGffAJtvyA)
5.  Paper: [The Role of Limitations and SLAs in the API Industry (ESEC/FSE ’19)](https://t.co/rBklEUvOcd?amp=1)

## **Acknowledge**

Thanks to all the members taking part of the SLA SIG: Tim Burks (Google), Dave O’Neil (Apimetrics), Paul Cray (Apimetrics), Hyungjun Lim (Google), Khushan Adatiya (Google), Fran Mendez (AsyncAPI), Emmanuel Paraskakis (Independent), Phil Sturgeon (Stoplight), Nikhil Kolekar (Independent), Prithpal Bhogill (Google), Madhurranjan Mohaan (Google), Isaac Hepworth (ex-Google), Scott Ganyo (Google), Kin Lane (API Evangelist), Mike Ralphson (Independent), Jeffrey ErnstFriedman (OpenTravel Alliance), Antonio Ruiz-Cortes (ISA Group/University of Sevilla), Pedro J. Molina (Metadev & ISA Group) and Pablo Fernandez (ISA Group/University of Sevilla).

Thanks also to the TSC and OpenAPI Initiative members for encouraging us and providing the resources and feedback to make this possible.
