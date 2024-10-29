"use client";

import React, { useEffect, useState } from "react";
import scss from "./SignUp.module.scss";
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpMutation } from "@/redux/apiAuth/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Loader from "@/components/ui/loader/Loader";

interface IFormAuthSignUp {
  email: string;
  password: string;
  username: string;
  photo: string;
}

const SignUp = () => {
  const router = useRouter();
  const [SignUp] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { register, handleSubmit, reset } = useForm<IFormAuthSignUp>();

  const onSumbit: SubmitHandler<IFormAuthSignUp> = async (data) => {
    try {
      const response = await SignUp(data).unwrap();
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
      toast.success(`Вы успешно прошли регистрацию!`, {
        className: scss["toast-custom"],
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };


  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false); 
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  if (isLoadinger) {
    return <> <Loader/> </>; 
  }

  return (
    <section className={scss.SignUp}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth_img}></div>
          <div className={scss.auth_form}>
            <h1>Create an account</h1>
            <p>Enter your details below</p>
            <form onSubmit={handleSubmit(onSumbit)}>
              <input
                type="text"
                placeholder="Enter your URL img"
                {...register("photo", { required: true })}
              />
              <input
                type="text"
                placeholder="Name"
                {...register("username", { required: true })}
              />
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
              <button>Create Account</button>
            </form>

            <button>Sign Up with Google</button>
            <h6 onClick={scrollToTop}>Already have account? <Link href='/auth/sign-in'> <span>Log In</span> </Link> </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;  