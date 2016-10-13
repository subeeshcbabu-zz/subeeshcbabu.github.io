---
layout: post
title:  "Swagmock - The mock data generator for Swagger (aka OpenAPI)"
date:   2016-10-9 10:25:53 -0700
categories: Trending_modules
---
**[Swagger](https://openapis.org/) (aka OpenAPI)** is pretty much the de facto standard in defining and describing **REST APIs** across different platforms. Swagger has been excellent in providing a vendor neutral and language agnostic description format for APIs.

The [Swagger specification](https://github.com/OAI/OpenAPI-Specification) offers a standard definition, using which, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Swagger, the world’s most popular REST API description format, has a huge community support including vast number of libraries, frameworks and tooling that very well define the **Swagger ecosystem**.

When I started using Swagger and building modules for the [open source community](http://swagger.io/open-source-integrations/), I noticed that, there were not much support around **unit testing**, for the swagger ecosystem. I was predominantly working on the **Node.js** support for Swagger including the modules like [swaggerize-express](https://github.com/krakenjs/swaggerize-express), [swaggerize-hapi](https://github.com/krakenjs/swaggerize-hapi) etc. Even though I was able to use popular unit testing frameworks like [mocha](https://mochajs.org/) and [tape](https://github.com/substack/tape) to test the `swaggerize` modules, there wasn't any module out there to generate **mock data** based on swagger spec.

### Why mock data is important for Swagger spec?

### Enter Swagmock 🎉🎉🎉

`Swagmock` is a module that helps you generate mock data based on the Swagger spec. You can generate mock `parameters`, mock `response` data and mock `request`, all adhering to the swagger definition spec, and still, maintaining the randomness aspect of mock data generation.


```javascript
    let Swagmock = require('swagmock');
    let Mockgen = Swagmock(api, options);
```
