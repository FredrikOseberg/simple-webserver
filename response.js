const Headers = require('./headers');

const statusTexts = {
  200: 'Ok',
  404: 'Not found',
  500: 'Internal server error',
  401: 'Unauthorized',
};

class Response {
  constructor(connection, protocol) {
    this.status = 200;
    this.headers = new Headers();
    this.protocol = protocol;
    this.connection = connection;
  }

  setProtocol = (protocol) => {
    this.protocol = protocol;
  };

  setStatus = (status) => {
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

  formatHeaders = () => {
    let result = '';
    for (const key in this.headers.store) {
      result += `${key}: ${this.headers.store[key]}\r\n`;
    }

    return result.length > 0 ? result : '';
  };

  formatBody = (body) => {
    if (body) {
      return `${body}\r\n`;
    }

    return '';
  };
}

module.exports = Response;
