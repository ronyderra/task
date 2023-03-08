import LobbyBackg from "../components/lobby/LobbyBackg";
import { useState } from "react";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [match, setMatch] = useState(true);
  const navigate = useNavigate();
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
