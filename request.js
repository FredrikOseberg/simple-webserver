const Headers = require('./headers');

class Request {
  constructor(req) {
    this.headers = new Headers(req.headers);
    this.method = req.method;
    this.path = req.path;
    this.body = req.body;
    this.protocol = req.protocol;
  }
}

module.exports = Request;
