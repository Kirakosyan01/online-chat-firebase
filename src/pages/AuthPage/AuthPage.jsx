import React from "react";
import { auth, provider } from "../../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
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
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
}
