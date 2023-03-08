import axios from "axios";
import { axiosInstance } from "./axios";
class Api {
  constructor() {
    this.base = "http://localhost:3030";
  }
  async findUser(userName) {
    try {
      return await axiosInstance(this.base).get(
        `/findUser?userName=${encodeURIComponent(userName)}`
      );
    } catch (e) {
      console.log(e, "in findUser");
      return undefined;
    }
  }
  async login(userName, password) {
    try {
      return await axiosInstance(this.base).get(
        `/login?userName=${encodeURIComponent(userName)}?password=${encodeURIComponent(password)}`
      );
    } catch (e) {
      console.log(e, "in login");
      return undefined;
    }
  }
  async leaderBoard() {
    try {
      return await axiosInstance(this.base).get(`/leaderBoard`);
    } catch (e) {
      console.log(e, "in leaderBoard");
      return undefined;
    }
  }
  async addUser(userName, password) {
    try {
      return await (
        await axios.post(this.base + `/addUser`, {
          userName,
          password,
        })
      ).data;
    } catch (e) {
      console.log(e, " in addUser");
      return undefined;
    }
  }
  async getActive(userName) {
    try {
      return await (
        await axios.post(this.base + `/getActive`, { userName })
      ).data;
    } catch (e) {
      console.log(e, " in getActive");
      return undefined;
    }
  }
  async addWin(userName) {
    try {
      return await axiosInstance(this.base).patch(`/addWin?userName=${userName}`);
    } catch (e) {
      console.log(e, "in addWin");
    }
  }
}

export default new Api();
