const SimpleServer = require('./simple-server');

const rootHandler = (req, res) => {
  res.headers.set('Content-Type', 'text/html');
  res.headers.set('Authorization', 'none');
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title></title>
    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" href="images/favicon.png" />
  </head>

  <body>
    <h1>Hello from webserver</h1>
  </body>
</html>`);
};

const receiveData = (req, res) => {
  let data;
  try {
    data = JSON.parse(req.body);
  } catch (e) {
    console.log(e);
  }

  res.headers.set('Content-Type', 'text/plain');
  res.headers.set('Authorization', 'none');
  res.send(`Hello from webserver, ${data.name}`);
};

const server = new SimpleServer();

server.get('/', rootHandler);
server.post('/receive', receiveData);

server.listenAndServe(5100);
