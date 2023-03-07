import LobbyBackg from "../components/LobbyBackg";
import { useState } from "react";
import PopUp from "../components/PopUp";

function Lobby() {
  const [match, setMatch] = useState(true);

  return match ? (
    <PopUp
      title={"Lets PLay"}
      btnText={"play"}
      btnFunc={() => alert("play")}
      secBtnText={"fuck off"}
      secBtnFunc={() => setMatch(false)}
    />
  ) : (
    <LobbyBackg />
  );
}

export default Lobby;
