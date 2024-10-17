import React from "react";
import animationData from "../../assets/animations/developer-discussing-different-options.json";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import style from "./authPage.module.css";
import Cookies from "universal-cookie";
import Google from "../../assets/icons/Google";
import Lottie from "lottie-react";
import { FaStaylinked } from "react-icons/fa6";

const cookies = new Cookies();

export default function AuthPage({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.auth_main__parent}>
      <div className={style.animationDiv}>
        <Lottie animationData={animationData} />
      </div>
      <div className={style.auth_main}>
        <h1>
        <FaStaylinked className={style.echoLink_logo}/>
          <span>Echo</span>Link
        </h1>
        <p className={style.welcome_p}>
          <span>"</span>Welcome to <span>Echo<a>Link</a></span>! Start a conversation now — ask questions, share
          ideas, or just chat with new friends!<span>"</span>
        </p>
        <button onClick={signInWithGoogle} className={style.signInWithGoogle}>
          {<Google />}Sign in With Google
        </button>
      </div>
    </div>
  );
}
