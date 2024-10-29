"use client";

import React, { useEffect, useState } from "react";
import scss from "./SignIn.module.scss";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/redux/apiAuth/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import Loader from "@/components/ui/loader/Loader";

interface IFormAuthSignIn {
  email: string; 
  password: string; 
}
 
const SignIn = () => {
  const router = useRouter();
  const [SignIn] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { register, handleSubmit, reset } = useForm<IFormAuthSignIn>();

  const onSubmit: SubmitHandler<IFormAuthSignIn> = async (data) => {
    try {
      const response = await SignIn(data).unwrap();
      console.log(response);

      localStorage.setItem(
        "tokenForAuth",
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      reset();
      router.push("/");
      toast.success(`Вы успешно вошли в систему!`, {
        className: scss["toast-custom"],
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadinger) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <section className={scss.SignIn}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth_img}></div>
          <div className={scss.auth_form}>
            <h1>Log in to Exclusive</h1>
            <p>Enter your details below</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />

              <div className={scss.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className={scss.showPasswordButton}
                >
                  {showPassword ? <VscEyeClosed /> : <RxEyeOpen />}
                </div>
              </div>
              <button>Log In</button>
            </form>
            <p>Forgot Password?</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
