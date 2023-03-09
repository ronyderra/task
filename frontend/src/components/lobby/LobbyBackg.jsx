import { useEffect, useState } from "react";
import Api from "../../helpers/api";
import "./LobyBackg.scss";

const LobbyBackg = () => {
  const names = ["Alice", "Bob", "Charlie"];
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await Api.leaderBoard();
    setLeaders(resp.data);
  };

  return (
    <div className="lobby">
      <div className="names left">
        {leaders.slice(0, 5).map((item, index) => (
          <div key={index} className="name">
            {item.userName} , {item.wins}
          </div>
        ))}
      </div>
      <h2 className="title">Lobby</h2>
      <div className="names right">
        {leaders.slice(5, 10).map((item, index) => (
          <div key={index} className="name">
            {item.userName} , {item.wins}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyBackg;
