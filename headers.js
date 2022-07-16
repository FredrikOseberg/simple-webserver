class Headers {
  constructor(headers = {}) {
    this.store = headers;
  }

  set = (key, value) => {
    this.store[key] = value;
  };

  get = (key) => {
    return this.store[key];
  };
}

module.exports = Headers;
