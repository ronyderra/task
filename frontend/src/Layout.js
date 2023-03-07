import { Outlet, Link } from "react-router-dom";
function Layout() {
  return (
    <div>
      <h1> TIC-TAC-TOE </h1>
      <Outlet />
    </div>
  );
}

export default Layout;
