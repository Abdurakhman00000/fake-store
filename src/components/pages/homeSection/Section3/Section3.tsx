"use client";

import React from "react";
import scss from "./Section3.module.scss";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { useGetAllProductsQuery } from "@/redux/api/product";
import { toast } from "react-toastify";
import Link from "next/link";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import FavoriteIcon from '@mui/icons-material/Favorite';


interface IProductFromApi {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

const Section3 = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { data } = useGetAllProductsQuery();

  //! favorite
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = (id: number) => favorites.some((data) => data.id === id);
  //! favorite

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleAddToCart = (item: IProductFromApi) => {
    const itemWith: CartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    addToCart(itemWith);
    toast.success(`${item.title} добавлено в корзину!`, {
      className: scss["toast-custom"],
      position: "top-right",
      autoClose: 1500,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className={scss.Section3}>
      <div className="container">
        <div className={scss.section_title}>
          <div className={scss.block}></div>
          <h2>Today’s</h2>
        </div>
        <h1>Best Selling Products</h1>

        <div className={scss.content}>
          <div className={scss.main_item}>
            {Array.isArray(data) ? (
              data
                ?.slice()
                .reverse()
                .map((item) => (
                  <div key={item.id} className={scss.item_card}>
                    <div className={scss.favorite_button}>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                    >
                      {isFavorite(item.id) ? <> <FavoriteIcon sx={{color: 'red', marginLeft: '-40px'}}/> </> : <> <FavoriteIcon sx={{color: 'rgba(0, 0, 0, 0.229)', marginLeft: '-40px'}}/> </>}
                    </p>
                  </div>
                    <Link href={`/item-details/${item.id}`}>
                      <div onClick={scrollToTop} className={scss.item_img}>
                        {
                          item.image ? (
                            <img src={item.image} alt="" />
                          ) : (
                            <img src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png" alt="" />
                          )
                        }
                      </div>
                    </Link>

                    <div className={scss.item_text}>
                      <h3>{truncateText(item.title, 16)}</h3>
                      <p>{item.price} сом</p>
                    </div>

                    <button onClick={() => handleAddToCart(item)}>
                      В корзину
                    </button>
                  </div>
                ))
            ) : (
              <div className={scss.if_data_none}>
                <div className={scss.pagin_block}></div>
                <div className={scss.pagin_block}></div>
                <div className={scss.pagin_block}></div>
                <div className={scss.pagin_block}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
