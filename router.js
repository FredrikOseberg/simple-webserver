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

  delete = (path, handler) => {
    this.setRoute(this.routes['DELETE'], path, handler);
  };

  patch = (path, handler) => {
    this.setRoute(this.routes['PATCH'], path, handler);
  };

  options = (path, handler) => {
    this.setRoute(this.routes['OPTIONS'], path, handler);
  };

  getRoute = (method, path) => {
    return this.routes[method][path];
  };

  setRoute = (currentPath, path, handler) => {
    currentPath[path] = handler;
  };
}

module.exports = Router;
