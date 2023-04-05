import { Manager, io } from "socket.io-client";

const baseURL = import.meta.env.VITE_BASE_URL;
const access_token = localStorage.getItem("token");

// console.log("socketCon - token", access_token);

export const socket = io(`${baseURL}`, {
  path: "/client",
  auth: {
    token: access_token,
  },
  transports: ["websocket", "polling"],
});
