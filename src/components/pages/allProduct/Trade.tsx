"use client";
import React, { useEffect, useState } from "react";
import scss from "./Trade.module.scss";
import { useGetAllProductsQuery } from "@/redux/api/product";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { toast } from "react-toastify";
import Link from "next/link";
import Loader from "@/components/ui/loader/Loader";

interface IProductFromApi {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

const Trade = () => {
  const { data } = useGetAllProductsQuery();

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
    <section className={scss.Trade}>
      <div className="container">
        <div className={scss.content}>
            <div className={scss.main_item}>
              <div className={scss.result_card}>
                {data?.map((item) => (
                  <div key={item.id} className={scss.item_card}>
                    <Link href={`/item-details/${item.id}`}>
                      <div onClick={scrollToTop} className={scss.item_img}>
                        {item.image ? (
                          <img src={item.image} alt="" />
                        ) : (
                          <img
                            src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                            alt=""
                          />
                        )}
                      </div>
                    </Link>

                    <div className={scss.item_text}>
                      <h3>{truncateText(item.title, 11)}</h3>
                      <p>{item.price} сом</p>
                    </div>

                    <button onClick={() => handleAddToCart(item)}>
                      В корзину
                    </button>
                  </div>
                ))}
              </div>
            </div> 
          </div>
        </div>
    </section>
  );
};

export default Trade;
