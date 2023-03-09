import LobbyBackg from "../components/lobby/LobbyBackg";
import { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import { socket } from "../helpers/congig";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPlayAgainst, setXorO } from "../store/reducer/user";

function Lobby() {
  const [match, setMatch] = useState(false);
  const [against, setAgainst] = useState("");
  const { userName } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("enteredLobby", userName);
  }, []);

  socket.on(userName, data => {
    const resp = JSON.parse(data);
    console.log(resp);
    switch (true) {
      case data === "declinedGame":
        setMatch(false);
        break;
      case resp?.event === "goPlay":
        console.log("game apprroved by " + resp.against);
        dispatch(setPlayAgainst(resp.against));
        dispatch(setXorO(resp.xOrO));
        navigate("/game");
        break;
      default:
        const p = JSON.parse(data);
        setAgainst(p.against);
        setMatch(true);
        break;
    }
  });

  const handleDecline = () => {
    setMatch(false);
    socket.emit("declinedGame", JSON.stringify({ against, userName }));
  };

  const handleApprove = () => {
    setMatch(false);
    socket.emit("approveGame", JSON.stringify({ userName, against }));
  };

  return match ? (
    <PopUp
      title={"Play against " + against}
      btnText={"play"}
      btnFunc={() => handleApprove()}
      secBtnText={"fuck off"}
      secBtnFunc={() => handleDecline()}
    />
  ) : (
    <LobbyBackg />
  );
}

export default Lobby;
