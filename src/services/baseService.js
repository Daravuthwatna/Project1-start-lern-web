import axios from "axios";

class BaseService {
  async sendRequest(url, data, method, extraHander = {}, extraConfig = {}) {
    const requestOptions = {
      method: method,
      url: url,
      data: data,
      headers: { ...extraHander },
      ...extraConfig
    };
    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  get(url, extraHander, extraConfig) {
    return this.sendRequest(url, null, "get", extraHander, extraConfig);
  }

  post(url, data, extraHander, extraConfig) {
    return this.sendRequest(url, data, "post", extraHander, extraConfig);
  }

  put(url, data, extraHander, extraConfig) {
    return this.sendRequest(url, data, "put", extraHander, extraConfig);
  }

  delete(url, data, extraHander, extraConfig) {
    return this.sendRequest(url, data, "delete", extraHander, extraConfig);
  }
}

export default new BaseService();
