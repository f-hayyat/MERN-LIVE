const http = require("http");
console.log("Server started");

const serverHandler = (req, res) => {
  console.log("I am inside function server", req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write(`
        <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Document</title>
        </head>
        <body>
            <h1>Hello from Server</h1>
        </body>
    </html>
`);
  res.end();
};

const server = http.createServer(serverHandler);
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
