import "./LoginForm.scss";
import { setUserName, setPassword } from "../store/reducer/credentials";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleChange = (value, input) => {
    switch (input) {
      case "userName":
        dispatch(setUserName(value));
        break;
      case "password":
        dispatch(setPassword(value));
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
        onChange={e => handleChange(e.target.value, "userName")}
        type="text"
      />
      <input
        className="formInput"
        placeholder="Password"
        onChange={e => handleChange(e.target.value, "password")}
        type="password"
      />
    </div>
  );
};

export default LoginForm;
