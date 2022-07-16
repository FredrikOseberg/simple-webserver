class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      PATCH: {},
      OPTIONS: {},
      DELETE: {},
    };
  }

  get = (path, handler) => {
    this.setRoute(this.routes['GET'], path, handler);
  };

  post = (path, handler) => {
    this.setRoute(this.routes['POST'], path, handler);
  };

  put = (path, handler) => {
    this.setRoute(this.routes['PUT'], path, handler);
  };

  patch = (path, handler) => {
    this.setRoute(this.routes['PATCH'], path, handler);
  };

  delete = (path, handler) => {
    this.setRoute(this.routes['DELETE'], path, handler);
  };

  getRoute = (verb, path) => {
    return this.routes[verb][path];
  };

  setRoute = (currentPath, path, handler) => {
    currentPath[path] = handler;
  };
}

module.exports = Router;
