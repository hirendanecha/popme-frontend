import axios from "../index";

const authAPI = {
  registrationApi({ firstName, lastName, email, password, config }) {
    return axios.post(
      "/api/auth/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
      config && config
    );
  },
  loginApi({ email, password }) {
    return axios.post("/api/auth/login", {
      email,
      password,
    });
  },
  verifyEmailApi(token) {
    return axios.post("/api/auth/emailVerification", {
      token,
    });
  },
  forgotPasswordApi(email) {
    return axios.post("/api/auth/forgot_password", {
      email,
    });
  },
  resetPasswordApi(data) {
    return axios.post("/api/auth/reset_password", data);
  },
  logoutApi() {
    return axios.get("/api/auth/logout");
  },
};

export default authAPI;
