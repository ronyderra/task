import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = () => {
    setLoggedIn(true);
    navigate("/lobby");
  };

  return (
    <div className="tic-tac-toe">
      {!loggedIn && (
        <PopUp
          title={"Login"}
          body={"Lets log u in"}
          btnText={"Login"}
          btnFunc={() => handleLogIn()}
        />
      )}
    </div>
  );
}

export default Login;
