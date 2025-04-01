import React from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Slider,
  Spin,
  Upload,
} from "antd";
import "../css/Screen.css";
import auth from "../../firebase_config";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    const provider = new GoogleAuthProvider();
    auth.languageCode = "th";
    //auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        if (result) {
          if (
            result.user.email == "s6702041510041@email.kmutnb.ac.th" ||
            result.user.email == "s6702041510164@email.kmutnb.ac.th"
          ) {
            notification.success({
              message: "Login success",
            });
            const userData = {
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              email: result.user.email,
            };
            localStorage.setItem("auth", JSON.stringify(userData));
            navigate("/admin");
          } else {
            notification.error({
              message: "This account have no permission",
            });
          }
        } else {
          notification.error({
            message: "This account have no permission",
          });
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <div className="bg-slate-950 h-screen">
      <Flex justify="space-between" className="navbarrr py-3 px-3">
        <p>Admin Login</p>
      </Flex>
      <Flex vertical={true} className="mt-9" justify="center" align="center">
        <p className="text-xl text-white">Admin Management</p>
        <form className="formDonate">
          <label htmlFor="igName">Login to Admin Management</label>
          <div className="flex justify-center mt-5">
            <Button onClick={login}>Login with Google Account</Button>
          </div>
        </form>
      </Flex>
    </div>
  );
};

export default Login;
