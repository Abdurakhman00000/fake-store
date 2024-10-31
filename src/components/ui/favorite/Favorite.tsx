"use client";

import { useFavoriteStore } from "@/store/useFavoriteStore";
import React, { useEffect, useState } from "react";
import scss from "./Favorite.module.scss";
import Loader from "../loader/Loader";
import Link from "next/link";

const Favorite = () => {
  const { favorites, removeFavorite } = useFavoriteStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [favorites]); 

  if (isLoading) {
    return <Loader />;
  }

  if (favorites.length === 0) {
    return <p>Нет избранных товаров.</p>;
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
        </div>
      </div>
    </section>
  );
};

export default Favorite;
