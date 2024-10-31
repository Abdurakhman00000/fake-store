"use client";

import React from "react";
import scss from "./ContactPage.module.scss";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';


// interface for type
interface IFormTelegram {
  name: string;
  email: string;
  phone: number;
  message: string;
}

/// imports from ENV
const TG_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAD_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAD_ID;
/// imports from ENV

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormTelegram>({
    mode: "onChange",
  });

  const botsMessageModel = (data: IFormTelegram) => {
    let messageTG = `User's name: <b>${data.name}</b>\n`;
    messageTG += `User's email: <b>${data.email}</b>\n`;
    messageTG += `User's phone number: <b>${data.phone}</b>`;
    messageTG += `User's message for you: <b>${data.message}</b>\n`;
    return messageTG;
  };

  const onSumbit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: CHAD_ID,
      parse_mode: "html",
      text: botsMessageModel(data),
    });
    reset();
  };

  return (
    <section className={scss.Contact}>
      <div className="container">
        <div className={scss.main_content}>
          <div className={scss.content_block1}>
            <div className={scss.block}>
              <div className={scss.block_logo}> 
                <IoCallOutline />
                <h5>Call To Us</h5>
              </div>
              <div className={scss.block_text}>
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +996559708515</p>
              </div>
            </div>

            <div className={scss.block}>
              <div className={scss.block_logo}>
                <AiOutlineMessage />
                <h5>Write To US</h5>
              </div>
              <div className={scss.block_text}>
                <p>
                  Fill out our form and we will contact <br /> you within 24
                  hours.
                </p>
                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSumbit)} className={scss.content_block2}>
            <div className={scss.min_inputs}>
              <input type="text" placeholder="Your name" {...register('name', {required: true})}/>
              <input type="text" placeholder="Your email" {...register('email', {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,})}/>
              <input type="text" placeholder="Your phone" {...register('phone', {required: true})}/>
            </div>
            <div className={scss.max_input}>
              <input type="text" placeholder="Your message" {...register('message', {required: true})}/>
            </div>
            {isSubmitting ? (
              <button disabled>Send...</button>
            ) : (
              <button>Send</button>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;
