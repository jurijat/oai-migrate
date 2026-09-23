---
title: An OpenAPI Interview with Marc-André Giroux of Github
date: "2021-07-15"
wordpressId: 1971
author: kinlane
category: blog
permalink: /blog/2021/07/15/an-openapi-interview-with-marc-andre-giroux-of-github
generated: true
---

_By Kin Lane, Chief Evangelist at Postman, and Co-Chair of the OpenAPI Initiative (OAI) Business Governance Board (BGB)_

I recently sat down with [Marc-André Giroux, Staff Developer at GitHub](https://www.linkedin.com/in/magiroux/) about their OpenAPI journey, to learn more about how the social coding platform employs OpenAPI across the API lifecycle. GitHub plays a central role in the development of software of any kind and is also central to the entire API lifecycle, but the platform’s APIs provide a wealth of learnings when it comes to how to deliver API infrastructure scale. So we are honored to have sat down for this discussion about the OpenAPI journey GitHub is on, and share this vision with the OAS community.

## When did you begin your journey using the OpenAPI specification?

GitHub began looking into OpenAPI in 2019. Funnily enough, two teams started to look at it independently, which highlights how OpenAPI brings many different benefits to the table. On one end, our documentation team wanted a machine-readable document from which to generate their documentation. On the other hand, the API team (the team I am on) wanted to use OpenAPI as something core to our API development experience. Things like having a design-first flow, request validation, contract testing, linting, etc.

Our documentation team started exploring with OpenAPI first. They ingeniously generated an initial document **from our hand-written documentation.** This was a great start, but from our API team’s perspective, since it was generated from something that we could not entirely trust, it was important for us that this OpenAPI description was being tested against, and used by our runtime code to make sure it is both accurate and complete.

Over the first half of 2020, we worked with the documentation team to use their initial work, bring it over to the API’s codebase and use it in a validation middleware that would tell us about any mismatches. We built tooling to automatically fix errors, fixed a lot of errors by hand, and in July 2020, we were ready enough to [release the beta of our OpenAPI description](https://github.blog/2020-07-27-introducing-githubs-openapi-description/).

## What teams are currently using OpenAPI within your organization?

The surface area of our API  is very wide. Almost every team working on a feature at GitHub will end up writing an API for it. This means that in the end, a ton of different teams interact with OpenAPI. As the API team, we consider these teams to be our customers as well. We make sure their experience with OpenAPI is great and that we have the right tooling to help them build great APIs. [Our documentation team also uses OpenAPI to generate most of our API documentation website](https://github.blog/2020-07-02-how-we-launched-docs-github-com/).

## Is OpenAPI used for public APIs? Internal APIs? Or Both?

OpenAPI is currently only used for our public API. We have a lot of internal APIs that we would eventually like to describe with OpenAPI. However, we’ve recently made the switch to using [Twirp](https://github.com/twitchtv/twirp) for most internal use cases, which is described by Protobufs.

##
Can you share more about how OpenAPI is being used across different areas?

**Documentation:**

The OpenAPI written by our developers gets automatically synced with our documentation repository. Our documentation team built an amazing pipeline which decorates the OpenAPI further and is used to render our [API documentation](https://docs.github.com/en/rest).

**Code Generation**

We also sync the OpenAPI description in [our open-source repository](https://github.com/github/rest-api-description). This is used by our first use case of code generation, the Octokit JS SDK. Gregor Martynus did an amazing job using the OpenAPI we publish to [generate typescript types](https://github.com/octokit/openapi-types.ts) and power the javascript SDK.

Soon, we want to help our own developers with code generation as well. We already leverage OpenAPI operations at runtime to configure certain resources, but we want to push it further and help generate implementations from OpenAPI operations.

**Testing**

GitHub’s API is implemented in an enormous Ruby monolith, with thousands and thousands of existing tests. We leveraged this by including a custom OpenAPI validation middleware in our existing integration testing suite for the API. This contract testing is integral to our confidence in the accuracy of our OpenAPI documents and was one of the hardest, and most important, parts of our OpenAPI work.

A lot of existing OpenAPI validators return errors that are not necessarily friendly to users. We spent a lot of time coming up with an abstraction that lets us return errors that are either developer-facing or end-user-facing. For example, the OpenAPI validation errors that are returned as part of our integration tests return error messages that instruct the developer on why the error happened and how to fix it. On the request validation side of things, we instead instruct the user on why their input was invalid, and how to correct it.

## What were the driving factors for you to adopt OpenAPI?

While generating documentation was an amazing benefit, OpenAPI was more than just that to us. Enabling powerful tooling and building a great developer experience were the main reasons we looked at OpenAPI.

## Do you make a copy of your OpenAPI available for download by users? If so, where do you make it available?

We do! As mentioned earlier, we have it available as an open-source repository located [here](https://github.com/github/rest-api-description).

## Do you currently have any OpenAPI extensions you are using or have established as part of your operations?

We use quite a few extensions that are useful at different stages of the “lifecycle” of our operations. We support many different versions of GitHub’s REST API. Our classic public API, but also every version of GitHub enterprise. While the APIs are similar, they do have differences across versions. Instead of duplicating every single operation and components, we opted for a build system that would allow us to annotate OpenAPI objects with versioning information. For example we have a \`x-github-releases\` extension that allows developers to include or exclude operations from certain releases. This extension is not present in our published descriptions since it is stripped by that build system.

We have other public extensions that add some GitHub-specific metadata to some OpenAPI objects. For example, we have an extension called \`x-github-previews\` which informs whether this operation is part of an [API preview](https://docs.github.com/en/rest/overview/api-previews).

Other extensions are [described in our open-source repository](https://github.com/github/rest-api-description/blob/main/extensions.md).

## Is your team joining the technical developer community conversations to evolve the OpenAPI specification?

Not at the moment, but the recent overlay specification talks are of great interest to us. We will most likely join these conversations very soon.

## Do you use other API specifications (ie. AsyncAPI, GraphQL, gRPC)? If so, can you share details of why?

We do! We use GraphQL as another public API which offers a different experience to GitHub’s domain and more flexible use-cases to our customers ([more about this here](https://github.blog/2016-09-14-the-github-graphql-api/)). As mentioned earlier, we also use Protobuf for our internal [Twirp](https://github.com/twitchtv/twirp) APIs.

## How did you convince leadership in your organization that OpenAPI was an important investment?

Fortunately, leadership was already onboard with using a machine-readable document to describe our APIs. We had extensive usage of JSON hyper-schema already, but the fast adoption of OpenAPI in the community and how it would allow us to describe our APIs accurately made us choose OpenAPI in the end.

## In Conclusion

GitHub’s adoption of OpenAPI follows similar trends we are seeing with other leading API providers like Salesforce, Twitter, Plaid, and others. Multiple teams are realizing the benefits of using OpenAPI, with documentation being the number one driver, but then code generation and testing being second and third. API providers who are further along in their journey have realized that OAS doesn’t always do 100% of what they need and, like GitHub, are extending the specification and increasingly moving towards participation in the weekly technical developer community calls to help evolve the specification. It is gratifying to see leading providers like Github recognize and start to leverage the benefits of the OpenAPI Specification (OAS) for their business, and we look forward to having them more involved in the community.
If you’d like to share your OpenAPI journey story we’d love to hear from you. While many of the details between Plaid, GitHub, and other API provider stories are similar, it helps to tell stories from multiple perspectives and business sectors. If you have an OpenAPI story you’d like to share, feel free to [submit a GitHub issue](https://github.com/OAI/Stories/issues) with your ideas, and we’ll consider adding it to the editorial queue. We wanted to thank GitHub, and Marc-André Giroux for letting us interview them, and share this great story with the OpenAPI community. Thanks to GitHub for providing us all with another example of why GitHub is a leader when it comes to how technology is delivered in the 21st century.
