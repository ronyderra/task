import { Routes, Route, Outlet, Link } from "react-router-dom";
import Game from "./pages/game";
import Layout from "./Layout";

function App() {
  return (
    <div className="tic-tac-toe">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="game" element={<Game />} />
          <Route path="game" element={<Game />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
