Boilerplate project for creating a sample express server build using ES6 (babel), and using 

+ express
+ mongoose
+ babel-cli
+ morgan for logging
+ Async/Await
+ indicative
+ jsonwebtoken

## Installation

```
Clone the repository and run `npm install`
```

## Starting the server

```
npm start
```

The server will run on port 3000.

## Readme

```
-- The code serves as a boilerplate and can be cloned and extended further as per the needs.
-- A sample controller, service , route and model is present for the reference.
-- A sample middleware named 'testMiddleware' is present in the middleware file which is a router level middleware and can be included on any route as required.
--'Morgan' library is used to create all API logs and all logs are stored in logs file present in logger folder.
-- JWT is set up and code to generate and verify token is present in a helper named 'jwt'.
-- 'Indicative' library is used for data validations and sanitization , just provide the rules to the validate function in a particular format - Ex. (name: 'required|string|min:4|max:20') .
-- A helper name 'sendResponse' is made to modify the output according to your needs.


```

## API logs parameters

Following is the info. which is stored for every API hit : 

```

'remote-addr', 
'remote-user' ,
'user-agent' ,
'date',
'method',
'url',
'http-version ',
'status', 
'content-length',
'response-time'

```


