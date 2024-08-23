class LocalStorage {
  setUserInfo(data) {
    if (data) {
      this.setAccessToken(data.accessToken);
      this.setRefreshToken(data.refreshToken);
      this.setExpiresIn(data.expiredIn);
      this.setUSerRole(data.role);
      this.setUser(data.user);
    }
  }
  setAccessToken(value) {
    if (value) {
      localStorage.setItem("accessToken", value);
    }
  }
  setRefreshToken(value) {
    localStorage.setItem("refreshToken", value);
  }
  setExpiresIn(value) {
    localStorage.setItem("expiredIn", value);
  }
  setUSerRole(value) {
    localStorage.setItem("role", JSON.stringify(value));
  }
  setUser(value) {
    localStorage.setItem("user", JSON.stringify(value));
  }
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  getExpiredIn() {
    return localStorage.getItem("expiredIn");
  }
  getUSerRole() {
    return JSON.parse(localStorage.getItem("role"));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

}

export default new LocalStorage();
