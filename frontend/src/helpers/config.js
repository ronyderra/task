import Socket from "./socket";
export const config = {
  _DEFAULT_SERVER: "http://13.50.109.68:3030",
  _DEFAULT_SOCKET: "wss://13.50.109.68:3030",
};
export const socket = new Socket(config._DEFAULT_SERVER);