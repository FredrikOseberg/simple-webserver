const Headers = require('./headers');

const statusTexts = {
  200: 'Ok',
  404: 'Not found',
  500: 'Internal server error',
};

class Response {
  constructor(connection) {
    this.status = 200;
    this.headers = new Headers();
    this.protocol = 'HTTP/1.1';
    this.connection = connection;
  }

  setProtocol = (protocol) => {
    this.protocol = protocol;
    return this;
  };

  status = (status) => {
    this.status = status;
    return this;
  };

  send = (body) => {
    const response = `${this.protocol} ${this.status} ${
      statusTexts[this.status]
    }\r\n${this.formatHeaders()}\r\n${this.formatBody(body)}`;
    this.connection.write(response);
    this.connection.end();
  };

  formatBody = (body) => {
    if (body) {
      return `${body}\r\n`;
    }
  };

  formatHeaders = () => {
    let result = '';
    for (const key in this.headers.store) {
      result += `${key}: ${this.headers.store[key]}\r\n`;
    }

    return result.length > 0 ? result : '\r\n';
  };
}

module.exports = Response;
