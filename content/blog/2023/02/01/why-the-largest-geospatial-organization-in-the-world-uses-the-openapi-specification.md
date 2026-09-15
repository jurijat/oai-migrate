---
title: Why the Largest Geospatial Organization in the World Uses the OpenAPI Specification
date: "2023-02-01"
author: openapi
category: blog
permalink: >-
  /blog/2023/02/01/why-the-largest-geospatial-organization-in-the-world-uses-the-openapi-specification
generated: true
---

The Open Geospatial Consortium ([OGC](https://www.ogc.org/)) recently announced that [OGC API – Tiles](https://www.ogc.org/standards/ogcapi-tiles) was adopted as an official OGC Standard. The OGC is a collective problem-solving community of experts from more than 500 businesses, government agencies, research organizations, and universities representing hundreds of thousands of geospatial professionals driven to make geospatial (location) information and services FAIR – Findable, Accessible, Interoperable, and Reusable.

The OGC API - Tiles Standard defines building blocks for creating Web APIs that support the retrieval of geospatial information as tiles. Different forms of geospatial information are supported, such as tiles of vector features (“vector tiles”), maps, imagery, and other types of geospatial information.

The new standard focuses on simple reusable REST API building blocks that can be described using the OpenAPI Specification.

![](/img/uploads/2023/01/Dr.-Gobe-Hobona-1.webp)

[Dr. Gobe Hobona](https://www.ogc.org/ogc/organization/staff/gobe-hobona), is the Director of Product Management, Standards at Open Geospatial Consortium (OGC).

> Dr. Hobona joined OGC Staff in 2017, having been an OGC member since 2004. As the Director of Product Management, he provides oversight of the development of OGC API Standards, managing releases, and product marketing.

**Who uses the Open Geospatial Consortium and why? Can you give an example?**

Standards by the Open Geospatial Consortium are used by hundreds of organizations to publish millions of datasets, as reported by [GeoSeer.net](https://www.geoseer.net/). Many of the organizations are OGC Members that all actively participate in a consensus process that designs and publishes standard specifications which improve interoperability. A few of the domains that make use of OGC Standards are [Aviation](https://www.ogc.org/domain/aviation), [Built Environment & 3D](https://www.ogc.org/domain/built), [Business Intelligence](https://www.ogc.org/domain/geobi), [Government & Spatial Data Infrastructure](https://www.ogc.org/domain/gov_and_sdi), [Energy & Utilities](http://www.opengeospatial.org/domain/EnergyUtilities), and many more.

A great example of those standards being used would be in the aviation industry like EUROCONTROL, the [European Air control](https://www.eurocontrol.int/) agency and the Federal Aviation Administration ([FAA](https://www.faa.gov/)) in the United States. Those teams publish a lot of their data using OGC Standards, specifically the Geography Markup Language (GML) which they have implemented in the Aeronautical Information Exchange Model (AIXM). Another example of the use of the standards is the OGC API – Features Standard which has been adopted as a Good Practice for implementing download services that are compliant with the European Union’s INSPIRE Directive, which positively affects hundreds of millions of EU citizens across the continent.

**What’s new about the release of OGC API – Tiles? How will this be used? Who should use this?**

We are really excited about it. The OGC API – Tiles Standard has been in the works for a number of years and now it is here. The OGC API defines building blocks for creating Web APIs that support the retrieval of geospatial information in tiles, basically little image chips that can be streamed with nearby chips to show a map. There are many great things about it, some special features include map tiles and vector tiles. Rather than the end user having to retrieve a large data set for the whole world, they can just retrieve that single tile. They can then use the identifier for that tile to collaborate with colleagues. Those in environmental sciences might retrieve a tile from other specialties and vice-versa. Now, instead of transferring terabytes of data across a network, it is just a subset.

We have standardized models for Tile Matrices, we have a registry where various organizations can agree on a set of tiling schemes to use together. There have been significant efficiency and cost savings seen across the board. Transmitting complete datasets over a network can incur some charges, so transmitting only relevant subsets offers cost savings. Also, performance has improved. For tiles that do not change, it is now possible to provide a cached tile. We recently hosted a [code sprint](https://www.ogc.org/pressroom/pressreleases/4798) in Brussels where developers came together from across the globe, and within a short time they were able to implement this standard, and simply just used the implementations through various client applications.

I’ll point out, all of that was made possible because the OGC API – Tiles Standard uses the OpenAPI Specification, which makes it attainable for web components to describe the capabilities for the resources, schemas, and so much more. In the previous generation of web service standards, it required developers to interpret the requirements of a standard. Now it is possible for some of that role to be done by the applications themselves. Apps can interpret what the API is intended to do. This takes away the burden from the developers and it leads to very happy developers!

**What is the advantage of open source with spatial information?**

Open standards by the OGC are used by both open source and proprietary software products; they do that to make Geospatial information more findable, accessible, interoperable, and reusable. One key thing about open standards and open source software is that they reduce the risk of vendor lock-in. With vendor lock-in, an organization gets tied to a single vendor and they must obtain products from that vendor. With open standards and open source software, it certainly reduces the risk of this and organizations do not have to buy from a single vendor. Furthermore, some common parts of commercial software come from open source to reduce the cost of developing some of that fundamental technology that can be shared; for example, the open source GDAL library is used by several commercial software products.

**Why do you support the OpenAPI Specification? What are the main advantages?**

The OpenAPI Specification makes it possible for developers to automatically create source code through code generators, by simply parsing an API definition document that complies with the OpenAPI Specification. In the past, most creation of source code required developers to manually read and interpret API definition documents, which led to human error and was certain to take longer to implement interfaces. Now, a lot of the interpretation is done by the application and then the human developer joins to codify the business logic. Moreover, using OpenAPI means that all of our APIs are defined in a consistent way so that the use of the APIs is predictable for all developers.

The efficiency gain for an organization is incredible. It is one of the key reasons why the OpenAPI Specification has been looked upon favorably by the OGC community.

OGC develops open standards, so everyone has the opportunity to provide some input to the standards. Other organizations do not have to wonder if there are some restrictions to access to the standards. But also, organizations can feed requirements in, as a community both the OGC and the Linux Foundation, which houses the OpenAPI Initiative and looks after the OpenAPI Specification, have done an excellent job of involving everyone across industry. There is a lot of feedback that is included or at least considered in the design of those standards. Everyone in the community has a chance to include input into those standards.

**What is the best way to get involved in the OGC?**

The OGC runs three member meetings a year, in different parts of the world, and with hundreds of participants. Now that travel restrictions are easing up, those meetings are now hybrid meetings with remote participants being supported.

OGC working groups use those meetings to gather needs and specs. In between those meetings, there are a series of working group get-togethers. For anyone that is interested in participating, I would recommend going to the OGC website and have a look at the information about [membership](https://www.ogc.org/ogc/membership-value), there is also a list of working groups. We have domain working groups in defense, aviation, meteorology, and more. We also have other working groups that focus on specification, like OGC API – Tiles and OGC API – Features.

The next OGC meeting will be from 20th to 24th February 2023, hosted by the European Space Agency in Frascati, Italy. That will be the first of three taking place in 2023, there will be another in June in Huntsville, Alabama, and another in September in Singapore.

I would also like to mention, the OGC runs several initiatives, we run [innovation initiatives](https://www.ogc.org/projects/initiatives/active), where members can join in. These are run by the Collaborative Solutions and Innovations team in OGC, those initiatives are funded by the OGC membership, and they provide an opportunity for research and development. I encourage anyone interested to look at the OGC website and participate in these activities.

* * *

## OpenAPI Resources

To learn more about participating in the evolution of the OpenAPI Specification: [https://www.openapis.org/participate/how-to-contribute](/participate/how-to-contribute)

-    [Become a Member](/membership/join)
-   [OpenAPI Specification Twitter](https://twitter.com/OpenApiSpec)
-   [OpenAPI Specification GitHub – Get started immediately](https://github.com/OAI/OpenAPI-Specification)!
-   [Share your OpenAPI Spec v3 Implementations](/specification/v3implementations-form)

About the OpenAPI Initiative

The OpenAPI Initiative (OAI) was created by a consortium of forward-looking industry experts who recognize the immense value of standardizing on how APIs are described. As an open governance structure under the Linux Foundation, the OAI is focused on creating, evolving and promoting a vendor neutral description format. The OpenAPI Specification was originally based on the Swagger Specification, donated by SmartBear Software. To get involved with the OpenAPI Initiative, please visit [https://www.openapis.org](/)

About Linux Foundation

Founded in 2000, the Linux Foundation is supported by more than 1,000 members and is the world’s leading home for collaboration on open source software, open standards, open data, and open hardware. Linux Foundation projects like Linux, Kubernetes, Node.js and more are considered critical to the development of the world’s most important infrastructure. Its development methodology leverages established best practices and addresses the needs of contributors, users and solution providers to create sustainable models for open collaboration. For more information, please visit us at linuxfoundation.org.
