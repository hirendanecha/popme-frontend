import axios from "./";

const workSpaceAPI = {
  // get list of all worksapce with pagination
  workspaceListApi({ page, size }) {
    return axios.get(`/api/workspace?page=${page}&size=${size}`);
  },

  // get all list for dropdown
  workspaceListForDropdownApi() {
    return axios.get(`/api/workspace?page=1&size=0`);
  },
 

  // add new worksoace
  addWorkspaceApi() {
    return axios.post("/api/workspace");
  },

  // delete workspace by id
  deleteWorkspaceByIdApi(id) {
    return axios.delete(`/api/workspace/${id}`);
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
