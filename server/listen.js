const https = require('https');
const fs = require('fs');

const port = 9000;

const server = https.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');
  if (request)
    return horrible(
      '',
      { count: 0, bad: [], visited: [], toVisit: [] },
      response,
    );
});

function horrible(url, countObj, shrek) {
  countObj.count++;
  countObj.visited.push(url);

  const options = {
    hostname: 'web-crawler-test1.herokuapp.com',
    path: `/${url}`,
    method: 'GET',
  };

  const request = https.request(options, response => {
    let body = '';
    if (response.statusCode == '404') {
      countObj.bad.push(url);
      if (countObj.toVisit.length === 0) {
        // console.log('finished', countObj);
        shrek.setHeader('Content-type', 'application/json');
        shrek.write(
          JSON.stringify({
            countObj,
          }),
        );
        response.end();
      } else {
        let newURL = countObj.toVisit.shift();
        horrible(newURL, countObj, shrek);
      }
    } else {
      response.on('data', data => {
        body += data.toString();
      });
      response.on('end', () => {
        const regex = /href=(")?(\S+.html)/g;
        const found = body.match(regex);
        if (found) {
          const urls = found.map(thing => thing.slice(6));
          let values = urls.forEach(url => {
            if (!countObj.visited.includes(url)) countObj.toVisit.push(url);
          });
        }
        let newURL = countObj.toVisit.shift();
        horrible(newURL, countObj, shrek);
      });
    }
  });

  request.on('error', err => {
    console.log(err);
  });

  request.end();
}

server.listen(port, err => {
  console.log(`Server listening on port ${port}`);
});
