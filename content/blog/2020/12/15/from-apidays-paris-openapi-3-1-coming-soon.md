---
title: "From APIDays Paris: OpenAPI 3.1 Coming Soon"
date: "2020-12-15"
author: openapi
category: blog
tags:
  - oas
  - openapi-spec
permalink: /blog/2020/12/15/from-apidays-paris-openapi-3-1-coming-soon
---

_[Originally posted in the LORNAJANE Blog](https://lornajane.net/posts/2020/whats-new-in-openapi-3-1) – Thank you, Lorna!_

# What’s New in OpenAPI 3.1

With OpenAPI 3.1 coming “soon”, I gave a talk at APIDays Paris about what to expect. But I’m a great fan of the written word as reference so here’s a written recap of what’s in the next OpenAPI release.

Top features:
– Compatible with JSON Schema 2020-12
– Webhook support
– Many other minor improvements

### Version Numbering

As of OpenAPI 3.1, the OpenAPI project doesn’t follow semantic versioning. That sounds like a totally irresponsible decision but it actually makes some sense for a standard where every API description clearly states the version of OpenAPI it relates to. Also, they don’t let me make the rules, sadly! It’s not a major release, but some things had to be undone and redone to accommodate JSON Schema.

### JSON Schema 2020-12

This is really big news, so much of OpenAPI is used alongside JSON Schema and the 3.0 release was quite a long time ago and didn’t quite accommodate everything that makes sense today in JSON Schema. This post won’t cover what’s new in JSON Schema itself but I’ll try to round up the main points from the perspective of OpenAPI users.

First of all: types can now be **arrays of types**, so something could be of type \[string,number\]. The available types also include null, so more common will be \[string, ‘null’\]. This does impact on existing OpenAPI documents as from 3.1, the nullable keyword is removed – use the array of types and one of the types is null.

```
parameters:
  - name: friendly-label
    in: query
    schema:
      type:
        - string
        - 'null'
```

OpenAPI 3.1 is getting support for the examples keyword within a schema, allowing an **array of examples**. Often the array only contains one element though. The original singular example keyword is still valid, but examples is recommended and if both are present then examples is preferred. Be aware that this array of values is in contrast with the _other_ use of examples in OpenAPI, in a MediaType content object, where the examples field is a map with string keys. Confused? So are we. There is [a post all about OpenAPI examples](https://phil.tech/2020/openapi-examples/) from Phil that explains it all!

A couple of other things are coming in from JSON Schema into the OpenAPI schemas. First of all: arbitrary keys are allowed in a schema; OpenAPI has relaxed its constraints on which fields can appear where to accommodate JSON Schema format objects. Also it’s possible to $ref to an object, then put keys alongside it which are considered in addition to what is defined in the component.

```
content:
  'application/json':
    schema:
      $ref: '#/components/schemas/style'
      required:
        - hue
```

None of these changes are huge, but having the ability to use JSON Schema within OpenAPI is brilliant for anyone wanting to use the two together so to have this commitment to supporting the ever-improving JSON Schema is excellent news.

### Webhooks

I’m totally biased because I proposed this feature. I couldn’t believe that OpenAPI didn’t already support this common use case and it took time to realise that it wasn’t that I didn’t understand how to do something – that thing really was outside what OpenAPI 3.0 expected APIs to describe.

OpenAPI 3.0 does have support for **callbacks** so if the user should make an API call, supply a URL, and stand by for incoming HTTP requests to that URL as a result, that’s already supported. This is ideal when an endpoint asynchronously returns data, or for some situations where an API call “subscribes” to an event and gives a URL to send things to.

OpenAPI 3.1 goes a step further and allows **webhooks** which are incoming HTTP requests that are in response to some external event or stimulus. A great example would be if you’ve ever linked anything to a GitHub push event, or an incoming order/payment/message (and I’ve been working for a communications company for a few years, so you can immediately understand how I got entangled in this). The webhooks are described a LOT like the existing callbacks are, and indeed both are much like the existing request descriptions, so I hope this change will be easily adopted by everyone who has a two-way API like this.

The new webhooks keyword is a top-level element, alongside paths. There are also changes to the required fields: OpenAPI 3.0 required openapi and info and paths but in OpenAPI 3.1 only openapi and info are always required, but the document must also contain at least one of paths or webhooks or components. This is brilliant because it allows API descriptions to contain only outgoing API calls, only incoming webhooks, only components that might be referred to by other documents, or any combination or all of these – and still be valid in its own right.

Anyway, back to the webhooks.

```
webhooks:
  inbound-sms:
    post:
      operationId: inbound-sms
      requestBody:
        content:
          application/json: ...
      responses: ...
```

Within the webhooks section, each incoming “thing” has a key (such as inbound-sms in the example above) and then it goes on just … looking like a pathItem, because that is all it is. You don’t need to specify the URL path that the webhook will come in on (often the user can nominate that anyway), just explain what will arrive and you are done. Oh and related to this: pathItem is now allowed in the components section and you can $ref to a pathItem from either a path or a callback or a webhook.

Fancy a sneak preview of what the webhooks will look like when the tools get support for it? [Redoc](https://github.com/Redocly/redoc) already has preview support if you use x-webhooks in your 3.0 OpenAPI documents! I mean, it just looks like really competent API documentation but that’s what we need here 🙂

A note about webhooks and callbacks. Quite a few endpoints could be considered as either a webhook or a callback, and I have already started getting questions about which to use. It probably doesn’t matter but if there is no preceeding API call that the callback is a response to, then it’s definitely a webhook. Where there is some previous API call with a URL, then it’s probably up to you how you want it to work. For example at Vonage the configuration for where to send events for an incoming Message is at the application level, do you do that with the Application API – but I’d rather have the API description with the incoming Message webhook detail shown next to the send Message API call, in the same document, tagged and grouped together in the Message API description. The webhooks keyword gives you the flexbility to approach this as you will.

### Small But Perfectly-Formed Upgrades

There are so many small things that have been added in OpenAPI 3.1 but I’m picking my favourites to include! As with every \*.1 release, there are things that seemed like a good idea for the \*.0 release that can now be tidied up a little now we’ve all tried them out in anger, it’s a good thin.

I’ll start with the one I want to implement immediately (or as soon as the tools allow): $ref can now have summary and description as siblings, and they override any existing fields on the referred-to component.

```
paths:
  /items:
    post:
      parameters:
        - $ref: '#/components/parameters/item'
          description: The specific item in question
```

There are a few minor things in the info section as well:

-   Inside info, you can now have summary alongside the description field. Both are optional – title is still required.
-   In the license object you can use an [SPDX](https://spdx.org/licenses) code in the new identifier field instead of a url alongside the required name field if you prefer

Finally, paths are no longer _required_ to have responses field for every endpoint. This is useful when an OpenAPI document is under construction because it means that it will validate even when you’re still only sketching out the endpoints that the API definition will include.

### Further Reading

I’ll share links to my talk when the recording is published (the [slides are on notist](https://noti.st/lornajane/YRdDlZ/whats-new-in-openapi-specification-3-1) but keep up with the current status of the OpenAPI 3.1 release and read the (much better) changelogs on the project itself for more information [https://github.com/OAI/OpenAPI-Specification/releases](https://github.com/OAI/OpenAPI-Specification/releases).
