"use client";

import React, { useEffect, useState } from "react";
import scss from "./ItemDetails.module.scss";
import { useGetAllProductsQuery } from "@/redux/api/product";
import { useParams } from "next/navigation";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";
import { RiLoopLeftFill } from "react-icons/ri";
import Loader from "@/components/ui/loader/Loader";
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

const ItemDetails = () => {
  const [count, setCount] = useState(0);
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data } = useGetAllProductsQuery();
  const itemDet = data?.find((item) => item.id.toString() === id);

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //! favorite
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = (id: number) => favorites.some((data) => data.id === id);
  //! favorite

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
    <section className={scss.ItemDetails}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.item_det_content}>
            <Zoom>
              <img src={itemDet?.image} alt="" />
            </Zoom>

            <div className={scss.item_det_text}>
              <h1>{itemDet?.title}</h1>
              <span>In Stock</span>
              <h3>{itemDet?.price} cом</h3>
              <div className="container_for_description">
                <p>{itemDet?.description}</p>
              </div>

              <div className={scss.item_color}>
                <h3>Color:</h3>
                <p>{itemDet?.color}</p>
              </div>

              <div className={scss.item_size}>
                <h3>Size:</h3>
                <p>{itemDet?.size}</p>
              </div>

              <div className={scss.item_buy_block}>
                <div className={scss.item_count}>
                  <button onClick={decrement}>-</button>
                  <p>{count}</p>
                  <button onClick={increment}>+</button>
                </div>
                <div className={scss.item_buy_btn}>
                  <Link href='/users-order'>
                  <button onClick={scrollToTop}>Buy Now</button>
                  </Link>
                </div>
              </div>

              <div className={scss.main_delivery}>
                <div className={scss.box}>
                  <FaTruckFast />
                  <div className={scss.text}>
                    <h4>Free Delivery</h4>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className={scss.box}>
                  <RiLoopLeftFill />
                  <div className={scss.text}>
                    <h4>Return Delivery</h4>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={scss.other_items}>
            <div className={scss.section_title}>
              <div className={scss.block}></div>
              <h2>Other Products</h2>
            </div>

            <div className={scss.content_for}>
              <div className={scss.main_item}>
                {Array.isArray(data) ? (
                  data
                    ?.slice()
                    .reverse()
                    .map((item) => (
                      <div key={item.id} className={scss.item_card}>
                        <Link href={`/item-details/${item.id}`}>
                          <div className={scss.favorite_button}>
                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item);
                              }}
                            >
                              {isFavorite(item.id) ? (
                                <>
                                  {" "}
                                  <FavoriteIcon
                                    sx={{ color: "red", marginLeft: "-40px" }}
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <FavoriteIcon
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.229)",
                                      marginLeft: "-40px",
                                    }}
                                  />{" "}
                                </>
                              )}
                            </p>
                          </div>
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
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
