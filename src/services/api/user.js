import axios from "./"; // from interceptor
const userAPI = {
  logoutApi() {
    return axios.get("/api/auth/logout");
  },
  updateProfileApi(data) {
    return axios.put("/api/user/profile", data);
  },
  changePasswordSettingApi(data) {
    return axios.put("/api/user/password", data);
  },
};

export default userAPI;
