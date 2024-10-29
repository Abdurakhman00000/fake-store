"use client";

import React, { useEffect, useState } from "react";
import scss from "./Cart.module.scss";
import useCartStore from "@/store/useCartStore";
import Header from "@/components/layout/header/Header";
import { CiCircleRemove } from "react-icons/ci";
import Loader from "../loader/Loader";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCartStore(); 

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
    <section className={scss.Cart}>
      <Header />
      <div className="container">
        <div className={scss.content}>
          <h2>Корзина</h2>

          {cart.length === 0 ? (
            <div className={scss.non_cart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className={scss.main_cart}>
              {cart
                .slice() 
                .reverse()
                .map((item) => (
                  <div className={scss.cart_block} key={item.id}>
                    <div className={scss.block1}>
                      <img src={item.image} alt={item.title} />
                      <h4>{truncateText(item.title, 25)}</h4>
                    </div>

                    <div className={scss.block2}>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <p style={{ margin: "0 10px" }}>{item.quantity}</p>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                      <p>{item.price * item.quantity} сом</p>

                      <div className={scss.remove_button}>
                        <div onClick={() => removeFromCart(item.id)}>
                          <CiCircleRemove />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className={scss.under_cart}>
            <div className={scss.coupon_cart}>
              <input type="text" placeholder="Coupon code" />
              <button>Apply coupon</button>
            </div>

            <div className={scss.total_block}>
              <h2>Cart total</h2>

              <div className={scss.main_box}>
                <div className={scss.box}>
                  <p>Total:</p>
                  <p>{parseFloat(getTotalPrice().toString()).toFixed(2)} сом</p>
                </div>

                <div className={scss.box}>
                  <p>Shipping:</p>
                  <p>free</p>
                </div>

                <div className={scss.box}>
                  <p>Total:</p>
                  <p>{getTotalPrice()} сом</p>
                </div>

                <button>Procees to checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
