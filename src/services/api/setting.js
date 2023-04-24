import axios from "./";

const settingAPI = {
  getAllPlansListApi() {
    return axios.get("/api/billing/plans");
  },
  paymentLinkApi(data) {
    return axios.post("/api/billing/payment-link", data);
  },
  customerPortalApi(data) {
    return axios.post("/api/billing/customer-portal", data);
  },
  getUserPlanDetailsApi() {
    return axios.get("/api/user/plan-details", {
      withCredentials: true,
    });
  },
};

export default settingAPI;
