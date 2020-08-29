# NodeJS Simple Server Connection (Notes)

The **http module** is required so that we can use the HTTP server.

**http.createServer(requestListener)** creates an HTTP server object. The requestListener is a callback function or handler that is called anytime an http request is made. It passes in the arguments *request* and *response*.

**Return value:** HTTP server object

**server.listen(port /*80*/, hostname /*localhost*/, backlog, callback)** creates a listener on a specified port or path. 

For instance, as in the example below, with a port of 3000 passed to the listener when we visit http://localhost:3000 the callback function will be invoked.

```javascript
const 
    /* Import http module */
    http = require('http'),

    /* http request callback function */
    reqListener = (request , response) => {

        /* Output the request object */
        console.log(request);
    },

    /* assign a newly created server object */
    server = http.createServer(reqListener);

/* A listener is added to the specified port */
server.listen(3000)

```

For brevity using chaining the above can be shortened to
```javascript
const http = require('http');

http.createServer((request , response) => {

    console.log(request);
}).listen(3000)

```
In the above example we added an event listener to the ***Event loop***. While this event listener is registered with the Event loop it will carry on running.

We can force an exit on the eventlistener with ***process.exit()***

```javascript
const http = require('http');

http.createServer((request , response) => {

    console.log(request);
    /* Hard exits the Event loop */
    process.exit()
}).listen(3000)

```
The event loop has no other listeners registered so will now quit.

## A look at the Request object.

The request object is a lengthy and detailed object. We can have a look at a few of the properties following a visit to http://localhost:3000

```javascript
/* Import http module */
const http = require('http');

http.createServer((req , res) => {

    console.log(
        'URL:', req.url,
        `\nMETHOD:`, req.method,
        `\nHEADERS:`, req.headers
    );
    
    /* terminate event */
    process.exit();

}).listen(3000)
```

Example Output
```
URL: /
METHOD: GET
HEADERS: {
  host: 'localhost:3000',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
  'sec-fetch-user': '?1',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9'
}
```

## The Response object.

We can fill the response object with *data* we want to send back to the client.

In the following example we use ***response.setHeader(name, value)*** to attach a header type to the response — in this case HTML.

```javascript
/* Import http module */
const http = require('http');

http.createServer((req , res) => {

    /* Attach a header type to the response */
    /* In this case HTML */
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head>
            <title>Response Data</title>
        </head>
        <body>
            <h1>Response from the server</h1>
        </body>
    </html>
    `);
    res.end();

}).listen(3000)
```
 ***response.write(chunk, encoding='utf8')*** is used to write the response body. This can be broken into mutiple writes and the data or chunks are streamed to the client.

 The response is finally executed with ***response.end()***

 ## Putting Request and Response together

In the following example a listener and http server our created. On an HTTP request to our base localhost address http://localhost:3000 a callback or handler function outputs HTML with a simple form to the page.
 
Once the form is submitted, data is sent as a ***POST*** request to the server and is then parsed and written to a text file.

```js
const 
    http = require('http'),
    fs = require('fs');

http.createServer((req , res) => {

    if (req.url === '/') {

        res.write(`
            <html>
                <head>
                    <title>Enter a message</title>
                </head>
                <body>
                    <form action='/message' method='POST'>
                        <input type='text' name='message'>
                        <button type='submit'>Send</button>
                    </form>
                </body>
            </html>
        `)
        return res.end();

    } else if (req.url === '/message' && req.method === 'POST') {
        
        const body = [];
        
        req.on('data', chunk => {

                body.push(chunk) /* chunk is ASCII code */
            })
            .on('end', () => {

                    /* example output: message=Some+text+here */
                    const parsedBody = Buffer.concat(body).toString();
                    fs.writeFileSync('message.txt', parsedBody.split('=')[1])
                })


    }

    res.statusCode = 302; /* 302 is a redirect */
    res.setHeader('Location', '/'); /* This will redirect us back to base URL */
    return res.end()

}).listen(3000)
```

We import the ***file system*** module ```require('fs')```, which enables us to work with the file system on our computer. 

Once again we create a server object with a callback/handler to be executed on an http request. The callback does an inital check on the request object to see if the url is our base address of ```http://localhost:3000``` and if so writes HTML with a simple form to the page.

```js
http.createServer((req , res) => {

    if (req.url === '/') {

        res.write(`
            <html>
                <head>
                    <title>Enter a message</title>
                </head>
                <body>
                    <form action='/message' method='POST'>
                        <input type='text' name='message'>
                        <button type='submit'>Send</button>
                    </form>
                </body>
            </html>
        `)
        return res.end();
    }

.
.
.
}).listen(3000)
```

On clicking the submit button the form data — in this case our 'message' value — is sent as a **POST** request to the server with the sub-address of ```/message```. An HTTP request is triggered, which is picked up on by the server.listener and in-turn triggers our server object's callback function.

This time the subsequent if condition, which checks for our URL of ```/message``` and request method of POST is *true*.

```js
else if (req.url === '/message' && req.method === 'POST') {
        
    /* somewhere to store our chunks of data */
    const body = [];
    
    req.on('data', chunk => {

            body.push(chunk) /* chunk is ASCII code */
        })
        .on('end', () => {

                /* example output: message=Some+text+here */
                const parsedBody = Buffer.concat(body).toString();
                fs.writeFileSync('message.txt', parsedBody.split('=')[1])
            })

}
```

Two eventListeners '**data**' and '**end**' are now added to the request object. 

On receiving **data** — in the form of [chunks](https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/) — the first eventListener passes a chunk of that data to it's handler function. The callback in this example pushes that chunk into our store array```body.push(chunk)```. The request object is then returned.

On completion the **end** eventListener's callback can then parse our stored data.

The filesystem offers synchronous and [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts) methods and in this case we use **writeFileSync** to write our data, which is concatenated and converted to a string to a text file.

While this is happening asyncronously the following code redirects up back to our base page and form.

```js
res.statusCode = 302; /* 302 is a redirect */
    res.setHeader('Location', '/'); /* This will redirect us back to base URL */
    return res.end()
```


