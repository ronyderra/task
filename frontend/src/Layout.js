import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      <h1> TIC-TAC-TOE </h1>
    </div>
  );
}

export default Layout;
