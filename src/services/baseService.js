import axios from "axios";
import LocalStorage from "../Utils/LocalStorage";
import { message } from "antd";

class BaseService {
  async sendRequest(url, data, method, extraHander = {}, extraConfig = {}) {
    const requestOptions = {
      method: method,
      url: url,
      data: data,
      headers: { Authorization: `bearre ${LocalStorage.getAccessToken()}`,...extraHander },
      ...extraConfig
    };
    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      message.error(error?.response?.data?.errors.msg || error.message, [1]);
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
