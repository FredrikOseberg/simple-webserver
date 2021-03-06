const Router = require('./router');
const HTTPParser = require('./http-parser');
const Response = require('./response');
const Request = require('./request');

const net = require('net');

class SimpleServer extends Router {
  constructor() {
    super();
    this.httpParser = new HTTPParser();
    this.server = net.createServer((connection) => {
      connection.on('data', (data) => {
        const httpMessage = data.toString();
        const requestObject = this.httpParser.parse(httpMessage);

        const req = new Request(requestObject);
        const res = new Response(connection);

        const handler = this.getRoute(req.method, req.path);

        if (typeof handler === 'function') {
          handler(req, res);
        } else {
          connection.write(`HTTP/1.1 404 Not found`);
          connection.end();
        }
      });
    });
  }

  listenAndServe = (port) => {
    this.server.listen(port, () => {
      console.log(`Listening for connections on ${port}`);
    });
  };
}

module.exports = SimpleServer;
