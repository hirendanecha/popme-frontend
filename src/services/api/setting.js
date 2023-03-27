import axios from "./";

const settingAPI = {
  getAllPlansListApi() {
    return axios.get("/api/billing/plans");
  },
};

export default settingAPI;
