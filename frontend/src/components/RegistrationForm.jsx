import "./login/LoginForm.scss";
import { setUserName, setPassword, setRepeate } from "../store/reducer/credentials";
import { useDispatch } from "react-redux";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleChange = (value, input) => {
    switch (input) {
      case "userName":
        dispatch(setUserName(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "repeat":
        dispatch(setRepeate(value));
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
      <input
        className="formInput"
        placeholder="Reapeat Password"
        onChange={e => handleChange(e.target.value, "repeat")}
        type="password"
      />
    </div>
  );
};

export default RegistrationForm;
