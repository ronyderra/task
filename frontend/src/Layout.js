import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      <h1> TIC-TAC-TOE </h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <Outlet />
    </div>
  );
}

export default Layout;
