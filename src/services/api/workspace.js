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

  // dusplicate workspace by id
  duplicateWorkspaceByIdApi(id) {
    return axios.post(`/api/workspace/${id}/duplicate`);
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
  updateWorkspaceApi({ data, id, config }) {
    // console.log("data", data);
    return axios.put(`/api/workspace/${id}`, data, config);
  },

  // add website
  addWebsiteApi({ data, id }) {
    return axios.put(`/api/workspace/website/${id}`, data);
  },

  // get workspace by identity
  getWorkspaceByIdentityApi(identity) {
    return axios.get(`/api/workspaces/${identity}/data.json`, {
      headers: {
        site: window.location.href,
        "site-origin": window.location.origin,
      },
    });
  },

  // get websites by workspace
  getWebsitesByWorkspaceIdApi(data) {
    // console.log("dataaaa", data);
    return axios.get(
      `/api/workspace/${data?.workspaceId}/website/${data?.websiteId}/pages`
    );
  },

  // detelet workspace website by id
  deleteWorkspaceWebsiteByIdApi(data) {
    return axios.delete(
      `/api/workspace/${data?.workspaceId}/website/${data?.websiteId}`
    );
  },
};

export default workSpaceAPI;
