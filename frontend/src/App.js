import { Routes, Route } from "react-router-dom";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from "./pages/login";
import Layout from "./Layout";

function App() {
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
