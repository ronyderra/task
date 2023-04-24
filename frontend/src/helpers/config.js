import Socket from "./socket";
export const config = {
  _DEFAULT_SERVER: "http://16.16.123.66:3030",
  _DEFAULT_SOCKET: "wss://16.16.123.66:3030",
};
export const socket = new Socket(config._DEFAULT_SERVER);