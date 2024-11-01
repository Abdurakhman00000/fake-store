"use client"

import React, { useState } from "react";
import scss from "./Order.module.scss";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

// interface for type
interface IFormTelegram {
  firstName: string;
  lastName: string;
  town: string;
  address: string;
  email: string;
  phone: number;
}

/// imports from ENV
const TG_TOKEN = process.env.NEXT_PUBLIC_SECOND_TELEGRAM_TOKEN;
const CHAD_ID = process.env.NEXT_PUBLIC_SECOND_TELEGRAM_CHAD_ID;
/// imports from ENV

const Order = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormTelegram>({
    mode: "onChange",
  });

  const botsMessageModel = (data: IFormTelegram) => {
    let messageTG = `User's name: <b>${data.firstName}</b>\n`;
    messageTG += `User's email: <b>${data.lastName}</b>\n`;
    messageTG += `User's phone number: <b>${data.town}</b>`;
    messageTG += `User's message for you: <b>${data.address}</b>\n`;
    messageTG += `User's message for you: <b>${data.email}</b>\n`;
    messageTG += `User's message for you: <b>${data.phone}</b>\n`;
    return messageTG;
  };

  const onSumbit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: CHAD_ID,
      parse_mode: "html",
      text: botsMessageModel(data),
    });
    reset();
    setTimeout(() => setIsModalOpen(true), 1300);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={scss.Order}>
      <div className="container">
        <div className={scss.main_content}>
          <div className={scss.content_block1}>
            <div className={scss.block}>
              <div className={scss.block_logo}>
                <FaTruckArrowRight />
                <h5>Deliver</h5>
              </div>
              <div className={scss.block_text}>
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +996559708515</p>
              </div>
            </div>

            <div className={scss.block}>
              <div className={scss.block_logo}>
                <MdDeliveryDining />
                <h5>Deliver</h5>
              </div>
              <div className={scss.block_text}>
                <p>
                  Fill out our form and we will contact <br /> you within 24
                  hours.
                </p>
                <p>Emails: deliver@exclusive.com</p>
                <p>Emails: orders@exclusive.com</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSumbit)}
            className={scss.content_block2}
          >
            <h2>Детали Заказа</h2>
            <div className={scss.inputs}>
              <p>
                First Name<span>*</span>
              </p>
              <input
                type="text"
                {...register("firstName", { required: true })}
              />

              <p>
                Last Name<span>*</span>
              </p>
              <input
                type="text"
                {...register("lastName", { required: true })}
              />

              <p>
                Town/City<span>*</span>
              </p>
              <input type="text" {...register("town", { required: true })} />

              <p>
                Street Address<span>*</span>
              </p>
              <input type="text" {...register("address", { required: true })} />

              <p>
                Email<span>*</span>
              </p>
              <input type="text" {...register("email", { required: true })} />

              <p>
                Phone Number<span>*</span>
              </p>
              <input type="text" {...register("phone", { required: true })} />
            </div>
            {isSubmitting ? (
              <button disabled>Процесс...</button>
            ) : (
              <button>Заказать</button>
            )}
          </form>
        </div>
      </div>


      {/* Модальное окно */}
      {isModalOpen && (
        <div className={scss.modalOverlay} onClick={closeModal}>
          <div className={scss.modalContent}>
            <h3>Ваш заказ оформлен</h3>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
