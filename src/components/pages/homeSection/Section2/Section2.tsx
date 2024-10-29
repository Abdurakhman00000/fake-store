"use client";

import React from "react";
import scss from "./Section2.module.scss";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { FiHeadphones } from "react-icons/fi";
import { LuGamepad } from "react-icons/lu";
import { CiCamera } from "react-icons/ci";
import Link from "next/link";

const Section2 = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className={scss.Section2}>
      <div className="container">
        <div className={scss.section_title}>
          <div className={scss.block}></div>
          <h2>Categories</h2>
        </div>

        <h1>Browse By Category</h1>
        <div className={scss.content}>
          <Link href="/product/phone">
            <div onClick={scrollToTop} className={scss.box}>
              <IoIosPhonePortrait />
              <p>Phones</p>
            </div>
          </Link>

          <Link href="/product/computer">
          <div onClick={scrollToTop} className={scss.box}>
            <RiComputerLine />
            <p>Computers</p>
          </div>
          </Link>

          <Link href="/product/watch">
          <div onClick={scrollToTop} className={scss.box}>
            <BsSmartwatch />
            <p>SmartWatch</p>
          </div>
          </Link>

          <Link href="/product/camera">
          <div onClick={scrollToTop} className={scss.box}>
            <CiCamera />
            <p>Camera</p>
          </div>
          </Link>

          <Link href="/product/headPhones">
          <div onClick={scrollToTop} className={scss.box}>
            <FiHeadphones />
            <p>HeadPhones</p>
          </div>
          </Link>

          <Link href="/product/gaming">
          <div onClick={scrollToTop} className={scss.box}>
            <LuGamepad />
            <p>Gaming</p>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section2;
