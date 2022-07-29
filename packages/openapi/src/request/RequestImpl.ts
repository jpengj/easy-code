type Options = {
  data?: any;
  params?: any;
  headers?: any;
};

type RequestHandler = <T>(url: string, method: string, options?: Options) => T;

type RequestMethod = <T>(url: string, options?: Options) => T;

interface RequestMethods {
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
  patch: RequestMethod;
  head: RequestMethod;
}

class RequestImpl implements RequestMethods {
  private static _: RequestImpl;

  private request: RequestHandler = () => {
    throw "You should call RequestImpl.handleRequest() to set request handler";
  };

  static get instance() {
    if (!this._) {
      this._ = new RequestImpl();
    }
    return this._;
  }

  static handleRequest(handler: RequestHandler) {
    this.instance.request = handler;
  }

  get<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "GET", options);
  }

  post<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "POST", options);
  }

  delete<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "DELETE", options);
  }

  put<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "PUT", options);
  }

  patch<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "PATCH", options);
  }

  head<T = any>(url: string, options?: Options) {
    return this.request<T>(url, "HEAD", options);
  }
}

export default RequestImpl;
