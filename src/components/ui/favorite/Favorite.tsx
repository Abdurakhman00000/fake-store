"use client";

import { useFavoriteStore } from "@/store/useFavoriteStore";
import React, { useEffect, useState } from "react";
import scss from "./Favorite.module.scss";
import Loader from "../loader/Loader";
import Link from "next/link";

const Favorite = () => {
  const { favorites, removeFavorite } = useFavoriteStore();

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

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <section className={scss.Favorite}>
      <div className="container">
        <div className={scss.content}>
          <h3>Избранные</h3>
          {favorites.length === 0 ? (
            <p className={scss.non_favorite}>Нет избранных товаров.</p>
          ) : (
            <div className={scss.main_item}>
              {favorites.map((item) => (
                <div key={item.id} className={scss.item}>
                  <Link href={`/item-details/${item.id}`}>
                    <img src={item.image} alt="" />
                  </Link>
                  <h4>{truncateText(item.title, 11)}</h4>
                  <button onClick={() => removeFavorite(item.id)}>
                    Убрать
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorite;
