"use client";

import React, { useEffect, useState } from "react";
import scss from "./UserProfile.module.scss";
import { useGetUserQuery, useLogOutMutation } from "@/redux/apiAuth/auth";
import Loader from "@/components/ui/loader/Loader";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserProfile = () => {
    const router = useRouter();
  const { data } = useGetUserQuery();
  const [LogOut] = useLogOutMutation();

  const handleLogOut = async () => {
    try {
        await LogOut().unwrap();
        localStorage.removeItem('tokenForAuth')
        router.push("/auth/sign-up");

        toast.success(`Вы успешно покинули систему!`, {
            className: scss["toast-custom"],
            position: "top-right",
            autoClose: 2000,
          });
    } catch (error) {
        console.log(error);
        alert("Ошибка при попытке LogOut")
    }
  }

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month}, ${year} ${hours}:${minutes}`;
  }

  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false);
    }, 1500);

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
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <h2>User Profile</h2>
          <div className={scss.user_img}>
            <p>User photo:</p>
            <Zoom>
              <img src={data?.profile.photo} alt="" />
            </Zoom>
          </div>
          <div className={scss.user_info}>
            <div className={scss.line}>
              <p>Users name:</p>
              <h2>{data?.profile.username}</h2>
            </div>
            <div className={scss.line}>
              <p>Users email:</p>
              <h2>{data?.profile.email}</h2>
            </div>

            <div className={scss.line_block}>
              <div className={scss.line_text}>
                <p>Users registration date:</p>
                <span>
                  {data?.profile.createdAt
                    ? formatDateTime(data.profile.createdAt)
                    : "Дата не указана"}
                </span>
              </div>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
