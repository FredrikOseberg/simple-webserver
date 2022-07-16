class HTTPParser {
  parse = (message) => {
    /* We need to validate the message format first, 
     otherwise our assumptions may be wrong. We can't control what other 
     people will send us. */
    // const validMessage = validateMessage(message);

    // if (!validMessage) return;

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
    /* get the status line by splitting the text message on the newline    
    character and reading the first element. 

    optimistally assume we have a newline. Improve by checking. */
    const fragments = message.split('\n');
    const statusLine = fragments[0];

    /* Split the status line by empty spaces to get the
    HTTP verb, path and protocol; */
    const statusLineFragments = statusLine.split(' ');

    /* We know the statusline includes these elements because we 
    validated the HTTP message */
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
      [key, value] = curr.split(':');
      acc[key.trim()] = value.trim();
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
