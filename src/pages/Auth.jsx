import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,

} from "firebase/auth";

import {auth, provider } from "../firebase/config";
import { toast } from 'react-toastify';


const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [isErr, setIsErr] = useState(null);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      createUserWithEmailAndPassword(auth, email, pass).catch((err) =>
       toast.error(err.code)
      );
    } else {
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        toast.error(err.code);
        if (err.code === "auth/invalid-credential") {
          setIsErr(true);
        }
      });
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(() =>
      toast.info("Mailinizi kontrol ediniz.").catch((err) => toast.error(err.code))
    );
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => toast.error(err));
  };
  return (
    <div className=" h-[100vh] bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img
            className="h-[60px] w-[60px]"
            src="../public/twitter-logo-png.png"
            width={"100px"}
          />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a giris yap.</h1>

        <div
          onClick={handleGoogle}
          className="flex items-center gap-3 cursor-pointer bg-white text-black py-2 px-10 rounded-full"
        >
          <img className="h-[20px]" src="../public/logo-google.png" alt="" />
          <p className="whitespace-nowrap">Google ile giris yap.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded p-2 "
            type="email"
            id="email"
          />

          <label className="mt-5" htmlFor="password">
            Password
          </label>
          <input
            className="text-black rounded p-2 "
            type="password"
            id="password"
          />

          <button
            className="bg-white text-black mt-10 rounded-full p-1 font-semibold transition hover:bg-gray-200"
            type="submit"
          >
            {!signUp ? " Giris Yap " : "Kaydol"}
          </button>

          <p className="text-gray-500 mt-5 flex justify-between">
            <span>Hesabiniz Yok mu? </span>
            <button
              onClick={() => setSignUp(!signUp)}
              className="mx-3 text-blue-500"
              type="button"
            >
              {signUp ? " Giris Yap " : "Kaydol"}
            </button>
          </p>

          {!signUp && isErr && (
            <button
              type="button"
              className="mt-4 text-red-400"
              onClick={handleReset}
            >
              Sifrenizi mi unuttunuz?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
