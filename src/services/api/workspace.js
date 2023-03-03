import axios from "./";

const workSpaceAPI = {
  // get list of all worksapce with pagination
  workspaceListApi() {
    return axios.get("/api/workspace");
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
};

export default workSpaceAPI;
