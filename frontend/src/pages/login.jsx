import { useNavigate, Outlet } from "react-router-dom";
import PopUp from "../components/PopUp";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setRegistered } from "../store/reducer/user";
import { userNameReg, PassReg } from "../helpers/regex";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, registered } = useSelector(state => state.user);
  const { userName, password, repeate } = useSelector(state => state.registration);

  const handleLogIn = () => {
    dispatch(setLoggedIn(true));
    navigate("/lobby");
  };

  const handleRegistration = () => {
    dispatch(setRegistered(false));
  };

  const handleNewUser = () => {
    if (userNameReg.test(userName) && PassReg.test(password) && password === repeate) {
      dispatch(setRegistered(true));
      dispatch(setLoggedIn(true));
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
          secBtnFunc={() => handleRegistration()}
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
