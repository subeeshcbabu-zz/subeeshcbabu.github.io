---
layout: post
title:  "Swagmock - The mock data generator for Swagger (aka OpenAPI)"
date:   2016-10-9 10:25:53 -0700
categories: Trending_modules
---

[Medium Post](https://medium.com/@subeeshcbabu/swagmock-the-mock-data-generator-for-swagger-aka-openapi-f20e7e9e1b82)

**[Swagger](https://openapis.org/) (aka OpenAPI)** is pretty much the de facto standard to define  and describe **REST APIs** across different platforms. Swagger has been excellent in providing a vendor neutral and language agnostic description format for APIs.

The [Swagger specification](https://github.com/OAI/OpenAPI-Specification) offers a standard definition, using which, a consumer can understand and interact with the remote service with minimal amount of implementation logic. Swagger, also the world’s most popular REST API description format, has a huge community support including vast number of libraries, frameworks and tooling that very well define the **Swagger ecosystem**.

When I started using Swagger to build modules for the [open source community](http://swagger.io/open-source-integrations/), I noticed that, there were not much discussions around **unit testing** guidelines and best practices for the swagger ecosystem. I was predominantly working on **Node.js** support for Swagger, including the modules like [swaggerize-express](https://github.com/krakenjs/swaggerize-express), [swaggerize-hapi](https://github.com/krakenjs/swaggerize-hapi) etc. Even though I was able to use popular unit testing frameworks like [mocha](https://mochajs.org/) and [tape](https://github.com/substack/tape) to test the `swaggerize` modules, there wasn't any module out there, to generate **mock data** based on the swagger spec.

### Why is mock data generation, so important for Swagger spec?

Let's say, you need to test the **input parameter validation** for the swagger spec:

```yml
swagger: '2.0'
info:
    version: 0.0.0
    title: Simple API
paths:
    /:
        get:
            parameters
                - name: tags
                  in: query
                  required: true
                  type: array
                  items:
                    type: string
                - name: limit
                  in: query
                  required: false
                  type: integer
                  format: int32
            responses:
                '200':
                    description: OK
```

To test the api's input parameter validations, you need to generate data for `tags` and `limit` parameters. The positive test cases, should make sure that `tags` exists as part of the request (required is `true`) and `limit` is optional. Also we need to generate data according to the schema of the parameters. For `tags` we need an array of `string` and for `limit` we need `integer` numbers.

This makes data generation (as per the spec), a vital part of the unit test eco system for swagger applications and modules.To summarize, the two important aspects of mock data generation would be,  

- **specification** - The data generated, should strictly follow the specification. Let's say if you are testing an API that validates numbers, the mock data generator should be able to generate random numbers for a particular parameter.

- **randomness** - It is important to generate random data, to test, edge case scenarios. Also using random data generator over fixtures, provides the added advantages of increase in code coverage, code readability, and less code maintenance.

So, to test the applications and modules (that deal with Swagger specifications), you need to generate *random* data based on the *spec* itself.

### Enter Swagmock 🎉🎉🎉

[Swagmock](https://github.com/subeeshcbabu/swagmock) provides exactly what we have been looking for - **a module to generate mock data based on the Swagger spec**. You can generate mock `parameters`, mock `response` data and mock `request`, all adhering to the swagger definition spec, and still, maintaining the randomness aspect of mock data generation.

```javascript
    let Swagmock = require('swagmock');
    let Mockgen = Swagmock(api, options);
```

```javascript
    Mockgen.parameters({
        path: '/',
        operation: 'get'
    }).then(mock => {
        console.log(mock);//This would print:
        // {
        //     "parameters": {
        //          "tags": [ 'abcdef', 'sgahjsgch' ],
        //          "limit": 12345
        //     }
        // }
    }).catch(error => {
        Assert.ifError(error);
    });
```

`Swagmock(api, [options])` initializes a mockgen object based on the swagger api. The `api` can be one of the following.

- A relative or absolute path to the Swagger api document.

- A URL of the Swagger api document.

- The swagger api Object

- A promise (or a `thenable`) that resolves to the swagger api Object

#### Generate response mock data

`mockgen.responses(options, [callback])` returns a promise that resolves to mock response object based on the swagger spec.

```javascript
    Mockgen.responses({
        path: '/',
        operation: 'get',
        response: 200
    }).then(mock => {

    }).catch(error => {

    });
```

#### Generate parameter mock data

`mockgen.parameters(options, [callback])` returns a promise that resolves to mock parameter object based on the swagger spec.

```javascript
    Mockgen.parameters({
        path: '/',
        operation: 'get'
    }).then(mock => {

    }).catch(error => {

    });
```

#### Generate request mock data

`mockgen.requests(options, [callback])` generates the mock request object based on the `options`. `requests` API resolves the `parameters` mock data to generate the `request` mock object useful for unit tests.

```javascript
    mockgen.requests({
        path: '/pet/findByStatus',
        operation: 'get'
    }).then(mock => {
        console.log(mock);
        //This would print:
        // {
        //     "request": {
        //         "query": "tags=abscefe,cajsahj&limit=12345"
        //     }
        // }
    });

```

### Examples

[github api express app](https://github.com/subeeshcbabu/swaggerize-examples/tree/master/express/github-express/tests)

[slack api hapi app](https://github.com/subeeshcbabu/swaggerize-examples/tree/master/hapi/slack/tests)

[spotify api hapi app](https://github.com/subeeshcbabu/swaggerize-examples/tree/master/hapi/spotify/data)

[glugbot api express app](https://github.com/subeeshcbabu/swaggerize-examples/tree/master/express/glugbot-express/tests/api)
