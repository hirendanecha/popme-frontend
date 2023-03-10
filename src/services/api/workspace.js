import axios from "./";

const workSpaceAPI = {
  // get list of all worksapce with pagination
  workspaceListApi({ page, size }) {
    if (page && size) {
      return axios.get(`/api/workspace?page=${page}&size=${size}`);
    } else {
      return axios.get("/api/workspace");
    }
  },

  // add new worksoace
  addWorkspaceApi() {
    return axios.post("/api/workspace");
  },

  // get workspace by id
  getWorkspaceByIdApi(id) {
    return axios.get(`/api/workspace/${id}`);
  },

  // get dropdown values
  getDropdownValuesApi() {
    return axios.get("/api/workspace/values");
  },

  // update workspace options
  updateWorkspaceApi({ data, id }) {
    return axios.put(`/api/workspace/${id}`, data);
  },

  // add website
  addWebsiteApi({ data, id }) {
    // console.log("data", data);
    // console.log("id", id);
    return axios.put(`/api/workspace/website/${id}`, data);
  },
};

export default workSpaceAPI;
