const https = require("https");
const http = require("http");

https
  .get("https://broken-links-api.herokuapp.com/", res => {
    let data = "";

    res.on("data", chunk => {
      data += chunk;
      data = JSON.stringify(data);
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
