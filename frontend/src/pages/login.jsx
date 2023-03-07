import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import LoginForm from "../components/LoginForm";

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
        <PopUp title={"Login"} body={<LoginForm />} btnText={"Login"} btnFunc={() => handleLogIn()} />
      )}
    </div>
  );
}

export default Login;
