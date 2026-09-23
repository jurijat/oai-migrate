---
title: Migrating from OpenAPI 3.0 to 3.1.0
date: "2021-02-16"
wordpressId: 1783
author: openapi
category: blog
tags:
  - 3-1
  - migration
  - oas
permalink: /blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0
generated: true
---

_This post is authored by Phil Sturgeon, product manager, Stoplight, and Chairperson, Protect Earth. If you’d like to donate to Phil’s charity of choice, please see [Protect Earth](http://www.protect.earth) which is reforesting the U.K. one field at a time._

OpenAPI v3.1 brings a lot of [great new functionality and improvements](https://lornajane.net/posts/2020/whats-new-in-openapi-3-1), and at some point in the near future you might find yourself wanting to upgrade. If you’re ready to give it a try, let’s take a look at the changes you may, or may not, need to make in order to get onto OpenAPI v3.1.

First things first, let’s change that version number! Open up your OpenAPI JSON or YAML file, and look for this line:

```
openapi: 3.0.3
```

Change that to.

```
openapi: 3.1.0
```

_If instead of \`openapi: 3.0.3\` you see \`swagger: 2.0\` then see if [swagger2openapi](https://github.com/Mermade/oas-kit/blob/master/packages/swagger2openapi/README.md) can help you upgrade to v3.0 before continuing._

In a perfect world this would be all you need to do, but despite the minor version number, v3.1 does have some small breaking changes. This decision was not made lightly. Thankfully the scope of the breaking changes is incredibly small, limited to the Schema Object, and achieves a much greater goal: full compatibility with modern JSON Schema.

## OpenAPI Schema is now valid JSON Schema

Everything inside the \`schema\` keyword in OpenAPI is defined by the [Schema Object](http://spec.openapis.org/oas/v3.0.3.html#schema-object). This has always been loosely based on JSON Schema, and referred to as a “subset superset” because it adds some things, and removes some other things from JSON Schema. This has caused confusion for some folks in the OpenAPI community. To resolve the subset superset problem, contributors from both communities came together, and got these two specifications aligned.

OpenAPI v3.0 was based on JSON Schema Draft 05, and JSON Schema has gone through a few drafts since then: Draft 06, Draft 07, and Draft 2019-09. Now thanks to feedback gathered from users and tooling maintainers during the v3.1.0 release candidates, one more small draft was released: [Draft 2020-12](https://json-schema.org/work-in-progress). This should be the last one for a while and no major changes are planned by the JSON Schema crew, so if all goes well a final release is on the horizon, to avoid any further discrepancies.

Supporting modern JSON Schema brings lots of handy new functionality, including being able to use [items arrays for tuples](https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation), or the if/then/else keywords as an alternative to awkward nested allOf > oneOf chains some folks were using for more dynamic payloads. We don’t need to learn every new thing JSON Schema can do right now, but if we’re going to upgrade we will need to know what to change in our OpenAPI documents.

## Schema Object Changes

### Swap nullable for type arrays

In line with JSON Schema, the \`type\` keyword can now define multiple types for a schema with an array. This is useful new functionality, but has also made nullable redundant. In order to achieve the goal of letting JSON Schema tools understand OpenAPI, it was decided to remove nullable entirely instead of deprecate it.

```
# OpenAPI v3.0
type: string
nullable: true

# OpenAPI v3.1
type:
- "string"
- "null"

```

This follows the keyword independence concept, where keywords should only add constraints, but adding one more keyword should not remove a constraint. Find and replace should solve this one rather quickly.

### Tweak exclusiveMinimum and exclusiveMaximum

These two keywords used to take a boolean value, which would modify the meaning of the \`minimum\` and \`maximum\` properties. In OpenAPI v3.1 they are distinct values.

```
# OpenAPI v3.0
minimum: 7
exclusiveMinimum: true

# OpenAPI v3.1
exclusiveMinimum: 7
```

Again this one can be solved with some find and replace, and I’d wager many of you don’t even use this keyword for anything.

### Use examples not example

OpenAPI has a lot of places that can have an example, or multiple examples. OpenAPI v3.0 can have \`example\` or \`examples\` at the Media Type level (requests, responses, callbacks, and webooks) but it can also have a very different type of \`example\` inside the Schema Object. This schema object singular example was an OpenAPI-specific keyword which is no longer necessary now as JSON Schema has \`examples\`.

This might need an visualisation, which I will defer to [Lorna Mitchell](https://lornajane.net/) because she made some excellent slides for her talk at APIDays Paris.

![](https://lh6.googleusercontent.com/8e2b6sQynA3qczBV97-c65luSs8tUV4CZL11d9oU7-CJLkj7MX7GIBmpOKVbKOaz9GmXuJ896CCFeUAOaz-FgnyLL3ZJKIVLqNbiqlTiS-nRPenpzqnAfRl6Dvhjymlt9p8iO7u1)

```
# OpenAPI v3.0
type: string
example: fedora

# OpenAPI v3.1
type: string
examples:
 - fedora

```

Basically switching any \`example\` inside a \`schema\` to \`examples\` and adding a hyphen at the start (which is a YAML array).

This is more typing if you’re writing YAML entirely by hand instead of using a visual editor, but it’s also a feature: adding multiple examples is now a lot easier. In the past to get multiple examples for a property or schema you would have to switch the type of example being used, from a property example to a media type example, which felt like overkill. Now you can do this:

```
type: string
examples:
 - fedora
 - ubuntu
```

### Describing File Upload Payloads

In OpenAPI v3.0, describing file uploads was signalled with a type: string and the format set to byte, binary, or base64. JSON Schema helps make this far more clear with its contentEncoding and contentMediaType keywords, which are designed for exactly this sort of use.

Uploading a binary file in a POST request? No need to even use a schema now.

```
# OpenAPI v3.0
requestBody:
  content:
    application/octet-stream:
      schema:
        type: string
        format: binary
```

\# OpenAPI v3.1

```
# OpenAPI v3.1
requestBody:
  content:
    application/octet-stream: {}
```

Uploading an image with base64 encoding?

```
# OpenAPI v3.0
requestBody:
  content:
    image/png:
      schema:
        type: string
        format: base64

# OpenAPI v3.1
requestBody:
  content:
    image/png:
      schema:
        type: string
        contentEncoding: base64
```

Multipart file uploads with a binary file?

```
# OpenAPI v3.0
requestBody:
  content:
    multipart/form-data:
  	schema:
       type: object
       properties:
        orderId:
          type: integer
        fileName:
          type: string
          format: binary

# OpenAPI v3.1
requestBody:
  content:
    multipart/form-data:
  	schema:
       type: object
       properties:
        orderId:
          type: integer
        fileName:
          type: string
          contentMediaType: application/octet-stream
```

This keyword supports all encodings defined in [RFC4648](https://tools.ietf.org/html/rfc4648), including “base64” and “base64url”, as well as “quoted-printable” from [RFC2045](https://tools.ietf.org/html/rfc2045#section-6.7).

## Declaring $schema Dialects to protect against change

That’s it for things you’ll _need_ to change, and there’s lots of other functionality I could talk about, but one thing which will help avoid change in the future is the ability to define a $schema in your schemas.

### $schema now allowed

The $schema keyword is optional but a useful way to define exactly what JSON Schema dialect a model is written in, which could be different drafts or even custom dialects. Tools which support multiple dialects can process the files slightly differently, meaning you don’t always need to make changes to all your models when upgrading OpenAPI versions in the future.

OpenAPI is entirely compatible with JSON Schema because it is now a JSON Schema dialect, so by default any schema is using \`$schema. “[https://spec.openapis.org/oas/3.1/dialect/base](https://spec.openapis.org/oas/3.1/dialect/base)”\` dialect. If you split your schemas into other JSON/YAML files and use $ref to point to them, they could contain a different $schema and override this default.

```
{
   $schema: "http://json-schema.org/draft-07/schema#",
}
```

This makes things a lot easier for tooling maintainers, because they no longer need to try and guess what draft a schema is by looking at where it is referenced from. In the past this created impossible situations where a single schema was referenced by OAS2 and OAS3 at the same time, and might have worked for a while, until a OAS3 specific keyword was added, now everything is broken for the OAS2 usage.

Now all models can declare their own dialect and if an OpenAPI document references a dialect that the tools do not understand how to parse, it will be immediately clear, instead of breaking after several months of usage and confusing everyone.
