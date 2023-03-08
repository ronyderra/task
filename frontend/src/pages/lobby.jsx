import LobbyBackg from "../components/lobby/LobbyBackg";
import { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [match, setMatch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return match ? (
    <PopUp
      title={"Lets PLay"}
      btnText={"play"}
      btnFunc={() => navigate("/game")}
      secBtnText={"fuck off"}
      secBtnFunc={() => setMatch(false)}
    />
  ) : (
    <LobbyBackg />
  );
}

export default Lobby;
