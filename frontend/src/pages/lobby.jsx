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

  useEffect(() => {
    if (!userName) {
      socket.emit("exitLobby", userName);
    }
  }, [userName]);

  socket.on(userName, data => {
    let parsed;
    switch (true) {
      case data === "declinedGame":
        setMatch(false);
        break;
      case JSON.parse(data)?.event === "goPlay":
        parsed = JSON.parse(data);
        dispatch(setPlayAgainst(parsed.against));
        dispatch(setXorO(parsed.xOrO));
        socket.emit("exitLobby", userName);
        navigate("/game");
        break;
      default:
        if (match) break;
        parsed = JSON.parse(data);
        setAgainst(parsed.against);
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
