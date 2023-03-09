import axios from "axios";
import { axiosInstance } from "./axios";
// import jwtDecode from "jwt-decode";

const getJwt = () => {
  console.log("geeg", document.cookie);
  const jwt = document.cookie.split(";").find(cookie => cookie.trim().startsWith("jwt="));
  if (!jwt) {
    return null;
  }
  return jwt.split("=")[1];
};
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
        `/login?userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(
          String(password)
        )}`
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
  async checkWinner(squares) {
    try {
      const jwt = getJwt();
      //for production
      // if (!jwt) {
      //   throw new Error("No JWT found");
      // }
      return await (
        await axios.post(
          this.base + `/checkWinner`,
          { squares },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
      ).data;
    } catch (e) {
      console.log(e, " in checkWinner");
      return undefined;
    }
  }
  async addWin(userName) {
    try {
      const jwt = getJwt();
      //for production
      // if (!jwt) {
      //   throw new Error("No JWT found");
      // }
      return await axios.patch(this.base + `/addWin?userName=${userName}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (e) {
      console.log(e, "in addWin");
    }
  }
}

export default new Api();
