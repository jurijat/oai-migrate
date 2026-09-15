---
title: OpenAPI Community Hero – Phil Sturgeon
date: "2025-04-01"
author: openapi
category: blog
tags:
  - community
  - hero
  - openapi
permalink: /blog/2025/04/01/openapi-community-hero-phil-sturgeon
generated: true
---

_It time for our next Community Hero, and this time we talk to Leviathan of the API world [Phil Sturgeon](https://github.com/philsturgeon)._

_Phil is author of [Build APIs You Won’t Hate](https://apisyouwonthate.com/books/build-apis-you-wont-hate/), ex-WeWork system architect, ex-Stoplight product manager, and now working on Green Tech and API consulting._

_Phil gave us some insights into the early days of OpenAPI, what he thinks would be great in version 4.0, and his hopes for a future of green software._

## What drives your interest and involvement in the OpenAPI Specification?

The first time I tried to document an API I thought “this is a bit of a mess”, and for years it always was. It involved so much repetition, restating exactly the same interface already written down in integration tests, contract tests, serializers, validation logic, serializers… all in mismatching formats that needed awkward conversions at various phases of the API lifecycle.

OpenAPI appeared as the solution. It took a little work to get JSON Schema and OpenAPI v3.1 lined up properly, and various other corners needed rounding off, but getting involved with the OpenAPI spec and helping to define the OpenAPI-based API Design-first workflow has made life easier for API designers and developers all the way through the API lifecycle.

## What do you consider to be your most significant personal contribution to the development of OpenAPI?

API linting and automated style guides have been a passion ever since working as a systems architect helping 100+ developers on various teams get started with OpenAPI. There was barely any tooling around for this concept and there were countless mistakes being made often, so I created Speccy to guide teams in how to avoid these mistakes in their OpenAPI and the actual API being designed.

This later inspired Spectral, and I joined the Stoplight team to help. As product & project manager of the open-source tool, and with a brilliant team, we created something so powerful that every major OpenAPI tooling vendor has integrated Spectral into their own tooling. It’s helping countless API teams around the world from tiny startups to massive corporations.

Automated style guides are now a regular part of making APIs consistent, useful, and even secure. For those working on API governance, it’s removed the most horribly boring and confrontational parts of API design reviews so that robots can handle all that rubbish.

Working on something as big as Spectral has been an amazing experience, even now as alternatives are gaining popularity, they are replicating its functionality and maintaining compatibility with the Spectral ruleset format. I love talking to these teams to help them avoid mistakes I made, share ideas we never got around to doing, and generally develop a better API linter so that the space can keep on evolving for years to come.

## What do you see as the most exciting proposed features of version 4 of OpenAPI?

There’s a lot to be excited about, and a general tidy up and reduction in nested structures is going to help a lot of people not lose feeling in their fingers. For me the most exciting part is the increased use of standards.

Using JSON Schema to describe parameters via parameterSchema instead of a OAI Parameters Object will reduce complexity for tooling developers trying to figure out the complexities of style, explode, etc., something that is almost impossible to get right even if you dedicate your life to it.

Then of course there’s OpenAPI using proper URI Templates instead of something that looks a bit like URI Templates. Once again this makes life easier for tooling developers, but more importantly it will mean more powerful tooling coming quicker as these components can be plopped together like Lego bricks. This all means more options for end users and a better healthier ecosystem in general.

## The OpenAPI Initiative is now a multi-specification organisation. How will the project change now that we deliver more specifications to the API community?

The extended Marvel Universe of OpenAPI specifications is getting really interesting, and it’s fantastic to see tooling vendors jump on board to integrate them into their offerings. This creates far more extension points and opens up far more interesting workflows for OpenAPI-based tooling.

For example, Overlays were initially thought to be mostly helpful to technical writers, but have finally solved the problem of getting generated SDK examples from one provider embedded in API reference docs using completely different tools. This allows tooling vendors and end users to keep working on imaginative integrations in a standardized way so nobody has to waste their time on “SpecOps” a.k.a building weird brittle CLI scripts that mush YAML about.

Arazzo has defined the one workflow format for testing tools instead of everything building their own, but it’s also being used by OpenAPI-based documentation tools to break free of being API reference documentation only, documenting complex workflows without loads of copying and pasting into Markdown documents.

I am curious to see what else the Special Interest Groups can get over the line, and excited to see what that does to the wider API ecosystem.

## What do you see in the future for the OpenAPI Specification?

An increase in API design-first workflow now that the tooling has matured in all ecosystems enough for it to be quicker than not doing it.

At the same time I see a lot of improvements in OpenAPI-aware frameworks, and I’m excited to see more of that. Instead of writing a bunch of code then slapping some attributes around in the hope that they’re correct, these frameworks consider OpenAPI at its core, meaning that merely building the framework is generating OpenAPI.

If done properly I’m hopeful we’ll see a true hybrid approach, where people build things entirely API Design-first, then generate code in these OpenAPI-aware frameworks, and are able to accurately evolve it from there, getting the perks of both works without any of the downsides.

## What other standards developments do you consider particularly significant for the API economy?

Currently 2% of global CO2 emissions come from the internet and associated devices, and 80% of web traffic is APIs. I think we’re in an incredible place to have a meaningful impact on global emissions by simply learning to track emissions of our APIs and reduce them through some of the Green Software Foundation’s projects. If every single API developer reading this took the free Green Software Practitioner course and invited a few colleagues to do the same, we’d be off to a great start.

## Should more people get involved in developing the OpenAPI Initiative specifications and why?

Absolutely! Literally anyone can join the calls, and for a conversation about improving a YAML/JSON-based machine readable API description format they were honestly really fun.

Sometimes there are quite a few people, but sometimes there’s just the same handful. Whether you are bringing experience or fresh eyes, it’s all good stuff, and even if you just mostly listen to a few you might find you are learning, and you might find yourself sharing and contributing more than expected.

_Author: [Phil Sturgeon](https://www.linkedin.com/in/philipsturgeon/)_
