const https = require('https');
const fs = require('fs');

function horrible(url, countObj) {
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
        console.log('finished', countObj);
        // res.send stuff
      } else {
        let newURL = countObj.toVisit.shift();
        horrible(newURL, countObj);
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
        horrible(newURL, countObj);
      });
    }
  });

  request.on('error', err => {
    console.log(err);
  });

  request.end();
}

const wahh = horrible('', { count: 0, bad: [], visited: [], toVisit: [] });
