const http = require("http");
console.log("Server started");

const serverHandler = (req, res) => {
  console.log("I am inside function server", req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(`
    
        <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Home</title>
        </head>
        <body>
        <form action="/buy-product" method="POST">
            <h1>Hello from Home Page</h1>
            <input type="text" name="productName" placeholder="Enter your product name" />
            <button type="submit">Submit</button>
        </form>
            
        </body>
    </html>
`);
  } else if (req.url === "/buy-product") {
    const buffer = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      buffer.push(chunk);
      console.log("req completed");
    });
    req.on("end", () => {
      const body = Buffer.concat(buffer).toString();
      
      console.log(body);
      console.log("res sent");
    });
    res.statusCode = 302;
    res.setHeader("Location", "/product");
  } else if (req.url === "/product") {
    res.write(`<!DOCTYPE html>
      <html lang="en">
          <head>
              <title>Product Page</title>
          </head>
          <body>
              <h1>Your Products are here</h1>
          </body>
      </html>`);
  } else if (req.url === "/profile") {
    res.write(`<!DOCTYPE html>
      <html lang="en">
          <head>
              <title>Profile Page</title>
          </head>
          <body>
              <h1>Your Profile Page</h1>
          </body>
      </html>`);
  } else {
    res.statusCode = 404;
    res.write(`<!DOCTYPE html>
      <html lang="en">
          <head>
              <title>404 Page</title>
          </head>
          <body>
              <h1>404 Page Not Found</h1>
          </body>
      </html>`);
  }
  res.end();
};
const server = http.createServer(serverHandler);
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
