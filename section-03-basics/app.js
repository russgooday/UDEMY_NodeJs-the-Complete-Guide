/* --- A quick look at the request object --- */

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
    }

    if (req.url === '/message' && req.method === 'POST') {
        
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
