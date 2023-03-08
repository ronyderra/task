import { useNavigate, Outlet } from "react-router-dom";
import PopUp from "../components/PopUp";
import LoginForm from "../components/login/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setRegistered, setUserName } from "../store/reducer/user";
import { userNameReg, PassReg } from "../helpers/regex";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, registered } = useSelector(state => state.user);
  const { userName, password, repeate } = useSelector(state => state.credentials);

  const handleLogIn = () => {
    if (userNameReg.test(userName) && PassReg.test(password)) {
      dispatch(setRegistered(true));
      dispatch(setLoggedIn(true));
      dispatch(setUserName(userName));
      navigate("/lobby");
    } else {
      alert("Go register");
    }
  };

  const handleNewUser = () => {
    if (userNameReg.test(userName) && PassReg.test(password) && password === repeate) {
      dispatch(setRegistered(true));
      dispatch(setLoggedIn(true));
      dispatch(setUserName(userName));
      navigate("/lobby");
    } else {
      alert("make sure user name is only letters and password only numbers");
    }
  };

  return (
    <div className="tic-tac-toe">
      {!loggedIn && registered ? (
        <PopUp
          title={"Login"}
          body={<LoginForm />}
          btnText={"Login"}
          btnFunc={() => handleLogIn()}
          secBtnText={"Register"}
          secBtnFunc={() => dispatch(setRegistered(false))}
        />
      ) : loggedIn && registered ? (
        <></>
      ) : (
        <PopUp
          title={""}
          body={<RegistrationForm />}
          btnText={"Submit"}
          btnFunc={() => handleNewUser()}
        />
      )}
      <Outlet />
    </div>
  );
}

export default Login;
