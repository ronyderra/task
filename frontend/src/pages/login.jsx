import { useNavigate, Outlet } from "react-router-dom";
import PopUp from "../components/PopUp";
import LoginForm from "../components/login/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setRegistered, setUserName } from "../store/reducer/user";
import { userNameReg, PassReg } from "../helpers/regex";
import Api from "../helpers/api";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState("login");
  // const { loggedIn, registered } = useSelector(state => state.user);
  const { userName, password, repeate } = useSelector(state => state.credentials);

  const handleLogIn = async () => {
    if (userNameReg.test(userName) && PassReg.test(password)) {
      const resp = await Api.login(userName, password);
      console.log(resp);
      if (resp) {
        dispatch(setRegistered(true));
        dispatch(setLoggedIn(true));
        dispatch(setUserName(userName));
        setForm("");
        navigate("/lobby");
      } else {
        alert("Go register");
      }
    } else {
      alert("Go register");
    }
  };

  const handleNewUser = async () => {
    if (userNameReg.test(userName) && PassReg.test(password) && password === repeate) {
      const resp = await Api.addUser(userName, password);
      if (resp.userName) {
        dispatch(setRegistered(true));
        dispatch(setLoggedIn(true));
        dispatch(setUserName(userName));
        navigate("/lobby");
      } else {
        alert("make sure user name is only letters and password only numbers");
      }
    } else {
      alert("make sure user name is only letters and password only numbers");
    }
  };

  return (
    <div className="tic-tac-toe">
      {form === "login" ? (
        <PopUp
          title={"Login"}
          body={<LoginForm />}
          btnText={"Login"}
          btnFunc={() => handleLogIn()}
          secBtnText={"Register"}
          secBtnFunc={() => setForm("register")}
        />
      ) : form === "" ? (
        <></>
      ) : (
        <PopUp title={""} body={<RegistrationForm />} btnText={"Submit"} btnFunc={handleNewUser} />
      )}
      <Outlet />
    </div>
  );
}

export default Login;
