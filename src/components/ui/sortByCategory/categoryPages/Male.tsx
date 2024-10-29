"use client";

import React, { useEffect, useState } from "react";
import scss from "./Male.module.scss";
import { useGetAllProductByCategoryQuery } from "@/redux/api/product";
import Link from "next/link";
import { Rate } from "antd";
import SortByCategory from "../SortByCategory";
import Loader from "../../loader/Loader";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { toast } from "react-toastify";



interface IProductFromApi {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

const Male = () => {
  const { data } = useGetAllProductByCategoryQuery();

  const male = data?.filter((item) => item.category === "male")

  const addToCart = useCartStore((state) => state.addToCart);

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
    <section className={scss.Female}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.sort_block}>
            <SortByCategory />
          </div>
          <div className={scss.result_card}>
            {male?.map((item) => (
              <div className={scss.item_card} key={item.id}>
                <Link href={`/item-detailsForCat/${item.id}`}>
                  <div className={scss.item_img}>
                    <img onClick={scrollToTop} src={item.image} alt="" />
                  </div>
                </Link>
                <div className={scss.item_text}>
                  <h3>{truncateText(item.title, 9)}</h3> 
                  <p>{item.price} сом</p>
                  <div className={scss.rate}>
                    <Rate allowHalf defaultValue={item.rating} />
                  </div>
                </div>

                <button onClick={() => handleAddToCart(item)}>В корзину</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Male;
