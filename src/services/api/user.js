import axios from "./"; // from interceptor
const userAPI = {
  logoutApi() {
    return axios.get("/api/auth/logout");
  },
  updateProfileApi(data) {
    // console.log("data", data);
    return axios.put("/api/user/profile", data);
  },
};

export default userAPI;
