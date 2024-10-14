import React from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import style from './authPage.module.css';

import Cookies from "universal-cookie";
import Google from "../../assets/icons/Google";
const cookies = new Cookies()

export default function AuthPage({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
   const result =  await signInWithPopup(auth, provider)
   cookies.set("auth-token", result.user.refreshToken)
   setIsAuth(true)
    } catch(error) {
        console.log(error)
    }
  };

  return (
    <div className={style.auth_main__parent}>
    <div className={style.auth_main}>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle} className={style.signInWithGoogle}>{<Google />}Sign in With Google</button>
    </div>
    </div>
  );
}
