const http = require("http");
const fs = require("fs");

const port = 9000;

const server = http.createServer((request, response) => {
  const { url } = request;
  console.log(url);
  response.setHeader("Content-type", "application/json");
  response.write(
    JSON.stringify({
      links: {
        LinkNumber: 0,
        BrokenLinkNumber: 0,
        BrokenLinks: []
      }
    })
  );
  response.end();
});

server.listen(port, err => {
  console.log(`Server listening on port ${port}`);
});
