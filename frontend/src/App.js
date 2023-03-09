import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { backToIn } from "./store/reducer/user";
import { backToInit } from "./store/reducer/credentials";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from "./pages/login";
import Layout from "./Layout";
import { useEffect } from "react";
import { socket } from "./helpers/congig";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(backToInit());
    dispatch(backToIn());
    navigate("/");
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/game") {
      const myValue = localStorage.getItem("userName");
      socket.emit("exitLobby", myValue);
    }
  }, [location]);

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
