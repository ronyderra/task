import { useState } from "react";
import "./LoginForm.scss";

const LoginForm = () => {
  const [userName, setUserName] = useState(false);
  const [password, setPassword] = useState(false);

  const handleChain = (value, input) => {
    console.log({ userName, password });
    switch (input) {
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <input
        className="formInput"
        placeholder="User Name"
        onChange={e => handleChain(e.target.value, "userName")}
        type="text"
      />
      <input
        className="formInput"
        placeholder="Password"
        onChange={e => handleChain(e.target.value, "password")}
        type="password"
      />
    </div>
  );
};

export default LoginForm;
