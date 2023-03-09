import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { backToIn } from "./store/reducer/user";
import { backToInit } from "./store/reducer/credentials";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from "./pages/login";
import Layout from "./Layout";
import { useEffect } from "react";
import { socket } from "./helpers/congig";
import { useSelector } from "react-redux";

function App() {
  const { userName } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(backToInit());
    dispatch(backToIn());
    navigate("/");
    const handleBeforeUnload = () => {
      localStorage.clear();
      console.log({userName});
      socket.emit("exitLobby", userName);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="tic-tac-toe">
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index path="lobby" element={<Lobby />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<Layout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
