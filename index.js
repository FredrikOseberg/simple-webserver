const SimpleServer = require('./simple-server');

const server = new SimpleServer();

server.get('/', (req, res) => {
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
    <h1>Hello from another server</h1>
  </body>
</html>`);
});

const authSecret = 'unique-132';

server.post('/receive', (req, res) => {
  let data;
  try {
    if (req.headers.get('Content-Type') === 'application/json') {
      data = JSON.parse(req.body);
    }
  } catch (e) {
    console.log(e);
  }

  const requestAuth = req.headers.get('Authorization');

  if (requestAuth === authSecret) {
    res.headers.set('Content-Type', 'text/plain');
    res.headers.set('Authorization', 'none');
    res.send(`hello from webserver, ${data.name}`);
  }
  res.setStatus(401).send('You are not authorized to access this content');
});

server.options('/books', (req, res) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  res.setStatus(204).send();
});

server.get('/books', (req, res) => {
  res.headers.set('Content-Type', 'application/json');
  res.headers.set('Access-Control-Allow-Origin', '*');

  res.send(
    JSON.stringify([
      { title: 'A song of ice and fire' },
      { title: 'Lord of the rings' },
      { title: 'The hobbit' },
      { title: 'Harry Potter and the Philosophers stone' },
    ])
  );
  // HTTP/1.1 200 Ok
  //
  //  [
  //     { title: 'A song of ice and fire' },
  //     { title: 'Lord of the rings' },
  //     { title: 'The hobbit' },
  //     { title: 'Harry Potter and the Philosophers stone' },
  //   ]
});

server.listenAndServe(3000);
