import axios from "./"; // from interceptor
const userAPI = {
  logoutApi() {
    return axios.get("/api/auth/logout");
  },
};

export default userAPI;
