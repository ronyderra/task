import Socket from "../helpers/socket";
export const config = {
  _DEFAULT_SERVER: "http://localhost:3030",
  _DEFAULT_SOCKET: "wss://localhost:3030",
};
export const socket = new Socket(config._DEFAULT_SERVER);