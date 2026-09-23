---
title: OpenAPI Spec at APISTRAT 2016
date: "2016-11-01"
wordpressId: 164
author: jernstfriedman
category: blog
permalink: /blog/2016/11/01/openapi-spec-at-apistrat-2016
generated: true
---

The Open API Initiative (OAI) is focused on creating, evolving and promoting a vendor neutral API Description Format based on the Swagger Specification. As an open source project under the Linux Foundation, the OAI is committed to developing and promoting the OpenAPI Spec for use by all. We welcome contributions from members and non-members alike.

There are many things you and your organization can do to help to community.

1.  Leverage the spec: There are no fees or membership requirements to use the OpenAPI Specification: [GitHub | OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification)
2.  Develop the spec: All members of the community are invited to take part in conversations on how to evolve the spec. Find one of our [meta issues](https://github.com/OAI/OpenAPI-Specification/labels/Meta%20Issue) that applies to your project. If you don’t see [one here](https://github.com/OAI/OpenAPI-Specification/labels) log a [new issue](https://github.com/OAI/OpenAPI-Specification/issues).
3.  Share how you use the spec.
    -   Follow us on Twitter: [@OpenApiSpec](https://twitter.com/OpenApiSpec)
    -   Join our LinkedIn Group: [OpenAPI Specification](https://www.linkedin.com/groups/8556951)
    -   Attend, or offer to present at a [Meetup](https://www.meetup.com/The-Open-API-Initiative-OAI-Meetup/) in your area.
    -   and of course share on your own blog.
4.  If you are looking to support the project directly, consider having your company join the OAI as a member. Fill out [this form](/membership/join) to learn more. The project charter is [here](/participate/how-to-contribute/governance).

Not sure how to get started? Read how to participate [here](/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how).

* * *

## Learn More at APISTRAT 2016

## November 3rd

**API DESIGN & GOVERNANCE** | 11:00 am – 12:30 pm
[Matthew Reinbold, Lead, API Center of Excellence, Capital One DevExchange](http://boston2016.apistrat.com/speakers/matthew-reinbold)
What happens when a company decides to API everything? Organizations may be quick to follow Netflix and Amazon in the pursuit of microservice and service orientated architecture (SOA). But without the application of Conway’s Law, any governance effort (and, by extension, the API program) will fall short. Matthew has been instrumental in establishing and growing API governance programs at multiple enterprise companies. In this talk he will discuss effective API governance and the challenges in achieving it.

**MICROSERVICES: gRPC or REST? Why not both?** | 11:00 am – 12:30 pm
[Sandeep Dinesh, Developer Advocate, Google Cloud](http://boston2016.apistrat.com/speakers/sandeep-dinesh)
In this talk, Google’s Sandeep Dinesh will show you how you can build a gRPC endpoint that can intelligently serve gRPC over HTTP/2 while simultaneously serving JSON/REST over HTTP/1.1 on the same port! Then, he’ll walk through some benchmarks and best practices for deploying these microservices in a scalable way. Read more here

HYPERMEDIA:

**Hypermedia vs Graphs: Best buddies or the next API battleground?** | 1:30 pm – 3:00 pm
[Gareth Jones, Microsoft](http://boston2016.apistrat.com/speakers/gareth-jones)
We all wonder if this is the year that hypermedia becomes mainstream? But coming up on the rails, there is a new challenger: Graph-shaped APIs that predefine a wide network of relationships promise some of the benefits of hypermedia APIs, but present a more familiar programming model. Will graphs push aside hypermedia before it’s even had a chance, or will both styles play nicely? Is this trend a blocker to HATEOS nirvana or a stepping stone?
I’ll challenge the audience to consider combining these two approaches to open the door to mainstream hypermedia use, enriching a fixed graph with dynamic data and behavior. Volatile data and logic can use hypermedia and more foundational data can use graph approaches. In this way we can add value and depth to our apps without the drastic rewrites we so often expect from the transition to hypermedia. Read more here

ENTERPRISE:
**Breathing new life into legacy SOAP services** | 3:05 pm – 4:35 pm

[Darrel Miller, Software Developer, Microsoft](http://boston2016.apistrat.com/speakers/darrel-miller)
The reality is that SOAP services are no longer cool. Developers today want to integrate with APIs that are labelled REST. They want descriptive URLs, JSON payloads and familiar HTTP status codes. But many enterprises spent 10 years building SOAP services and many of those services are working just fine today. Rewriting them would be a huge effort with the risk of minimal gain. The good news is that it is possible to give developers what they are looking for without a re-write. You can take advantage of HTTP’s layered architecture to put a façade in front of your SOAP services, re-use all your existing code, breathe new life into your service and still support the existing client applications that are happily sending SOAP messages.This talk will explore the process of transforming native HTTP requests into SOAP messages and back into native HTTP responses. We will discuss which parts of the façading process can be automated and which parts require design decisions. Finally we will explore what capabilities we gain with this new style of API, and what we lose, so that you can make an informed decision on the future of your SOAP services.

**The Big Problem with the Big Picture** | 3:05 pm – 4:35 pm
[Amber Fallon, SmartBear Software](http://boston2016.apistrat.com/speakers/amber-fallon)
APIs are BIG. Bigger than many of us, even those of us in the industry, may realize – in fact, the total number of public APIs has exploded from under 7,500 in 2012 to over 15,000 in 2015. Larger companies have larger API structures, with more dependencies and integrations than ever before, and that number is growing. Entire business models have formed around the APIs provided by some of the industry’s heaviest hitters. Imagine app juggernauts like Uber or Waze functioning without Google Mapping technology, or the important relationship between Netflix and the underlying applications that power its video streaming – these applications are absolutely dependent on their underlying APIs. And, new applications dependent on public APIs crop up every single day.
With that scale come challenges like managing your public API in a way that will foster growth of dependent APIs, scaling up, maintaining your SLA, and allowing for the versatility of user created applications; your API may be used in ways you never envisioned. In this session, I’ll address challenges like sandboxing at scale, aiding in end user integrations, and managing the infinite number of dependencies larger APIs may encounter.

**How Low Can You Go? Reducing Costs and Development Time with AWS Lambda, API Gateway, Elastic Beanstalk, and 3scale (and don’t forget Swagger!)** | 9:05 am – 9:30 am
[Erin McKean, Founder, Wordnik](http://boston2016.apistrat.com/speakers/erin-mckean)
More than 18,000 developers have keys to the Wordnik API, which they use to build everything from edtech applications to word games to Twitterbots! Our original architecture has served more than 2bn calls since 2010, and has largely been a free service. When Wordnik relaunched as a nonprofit in late 2014, we realized we had to monetize our API to create a sustainable foundation for future development, and in order to monetize, we needed to reduce our operating costs and introduce new features — neither of which our previous architecture made simple. Enter AWS Lambda+API Gateway! By breaking down our current API into tiny functions, we can take advantage of the current microservice craze with minimal ops headaches. And by using Elastic Beanstalk and 3Scale to manage a reverse proxy, handling routing between the old and new API calls and managing billing is much easier, too. Add a pretty Swagger interface on top and you”re good to go … faster and cheaper!

* * *

## November 4th

TESTING AND MONITORING:
**Testing your APIs with Cucumber** | 11:15 am – 12:45 pm
[Ole Lensmar CTO, SmartBear Software](http://boston2016.apistrat.com/speakers/ole-lensmar)
BDD with Cucumber is gaining in popularity as it allows the expression of requirements using a custom domain-specific language that can be executed as tests to validate actual implementations. APIs in particular seem to have a lot to gain from this approach as they are often technical in nature; it seems that a correctly performed Cucumber implementation should allow increasingly non-technical stakeholders to participate in defining the requirements for an APIs behaviour and functionality. But how “non-technical” can cucumber vocabularies be made to describe something as inherently technical as APIs? When does it make sense to use imperative vs declarative approaches? How do you translate simple language to complex payloads and validations? How does the usage of Cucumber scale as the complexity of an API increases? And how can standards like Swagger make cucumber testing even more intuitive? I know you’re dying to find out – so don’t miss this opportunity to adopt the path of API Gherkin Nirvana!

FINTECH:
**OpenAPI Trek Beyond API Documentation** | 2:00 pm – 3:30 pm
[Arnaud Lauret IT Architect, AXA Banque](http://boston2016.apistrat.com/speakers/arnaud-lauret)
OpenAPI offers many possibilities that span the full API lifecycle, yet it is seen purely as a solution for generating API documentation. This session will tell the story of AXA Banque’s evolution from .doc and .pdf API documentation to the extensive use of OpenAPI Specification (formerly Swagger). Throughout the journey, we will identify the many advantages of API definition languages beyond simply generating API documentation, including design, testing, documentation continuous delivery, code generation, mocking, and prototyping new ideas.

**RESTing on the Shoulders of a Giant: How Capital One Builds Its APIs** | 2:00 pm – 3:30 pm
[Abdelmonaim Remani, Engineering Tech Lead, Capital One DevExchange](http://boston2016.apistrat.com/speakers/abdelmonaim-remani)
Since it was first introduced, the REST architectural style was plagued with a high degree of vagueness and a lot of ambiguity. The absence of a concrete reference implementation early on left it up to the most popular web APIs to establish themselves as the gold standard. To win the hearts and minds of every last web developer, the leading tech companies invested greatly in building RESTful APIs, and put tremendous resources behind evangelizing their own individual flavors of REST. Capital One is no exception to the rule. As counter-intuitive as it may seem to be for a financial institution of its caliber, and as challenging as it is being a player in an industry locked into archaic technology and restrained by regulations, Capital One is fully engaged in a company wide initiative to expose financial services through internal and public-facing APIs implemented in the latest and greatest open source technologies. This talk is about how Capital One does REST, where the stakes are much higher and the risks are well beyond giving customers the wrong turn-by-turn directions.

**Full Lifecycle Tool Support for APIs** | 2:00 pm – 3:30 pm
[Steven Fonseca, Principal Services Architect, Intuit](http://boston2016.apistrat.com/speakers/steven-fonseca)
The focus of the talk is showcase an internal Intuit tool called API Lifecycle Manager, a web app and set of APIs that enables the IT organization to produce APIs efficiently across their lifecycle from conception to retirement. The audience will be provided a glimpse into how Intuit IT coordinates the build out of a strategic portfolio of APIs including their functional allocation and service ownership, comprehensive contract documentation with innovations not found in current industry modeling languages, documentation generation and delivery. Examples of API Lifecycle Manager will be shown in the context of a story of how IT is enabling Intuit product to deliver delightful customer experience, particularly in the areas of subscription-based billing and commerce.

* * *

# THANK YOU

The Open API Initiative is proud to sponsor this year’s [APISTRAT 2016](http://boston2016.apistrat.com/) in Boston Nov. 2-4. Join OAI members: 3Scale, Apiary, Capital One, Cloud Elements, IBM, Intuit, Microsoft and SmartBear as we discuss the API economy. The seventh edition of the conference will bring together everyone – from the API curious to today’s leaders – to discuss opportunities and challenges in the API space.
