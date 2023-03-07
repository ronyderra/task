import { Routes, Route } from "react-router-dom";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from "./pages/login";
import Layout from "./Layout";

function App() {
  return (
    <div className="tic-tac-toe">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
