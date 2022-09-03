// POST /receive HTTP/1.1
// Authorization: unique-412;
// Content-Type: application/json;

// { "name": "fredrik" }

class HTTPParser {
  parse = (message) => {
    const status = this.getStatus(message);
    const headers = this.getHeaders(message);
    const body = this.getBody(message);

    return {
      ...status,
      headers,
      body,
    };
  };

  getStatus = (message) => {
    // validated message incoming
    const fragments = message.split('\n');
    const statusLine = fragments[0];

    // POST /receive HTTP/1.1
    const statusLineFragments = statusLine.split(' ');
    // ['POST', '/receive', 'HTTP/1.1']

    return {
      method: statusLineFragments[0],
      path: statusLineFragments[1],
      protocol: statusLineFragments[2],
    };
  };

  getHeaders = (message) => {
    const fragments = message.split('\n');

    const index = fragments.findIndex((elem) => elem === '');
    let headerFragments;

    if (index > 0) {
      headerFragments = fragments.slice(1, index);
    } else {
      headerFragments = fragments.slice(1);
    }

    const headers = headerFragments.reduce((acc, curr) => {
      const [key, value] = curr.split(':');

      if (key && value) {
        acc[key.trim()] = (value && value.trim()) || '';
      }
      return acc;
    }, {});

    return headers;
  };

  getBody = (message) => {
    const fragments = message.split('\n');

    const index = fragments.findIndex((elem) => elem === '');
    if (index > 0) {
      return fragments
        .slice(index + 1)
        .join('\n')
        .trim();
    }

    return '';
  };
}

module.exports = HTTPParser;
