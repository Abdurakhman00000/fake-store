"use client";

import React from "react";
import scss from "./Category.module.scss";
import { IoReturnDownBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoryBy = () => {
  const router = useRouter();

  const handleClickToHome = () => {
    router.push("/");
  };
  return (
    <section className={scss.CategoryBy}>
      <div className={scss.content}>
        <div className={scss.back}>
          <button onClick={handleClickToHome} className={scss.back_btn}>
            <IoReturnDownBack />
          </button>
        </div>

        <h1>Choose category</h1>

        <Link href="/category-page/byFemale">
          <p>Woman’s Fashion</p>
        </Link>

        <Link href="/category-page/byMale">
          <p>Man’s Fashion</p>
        </Link>

        <Link href="/category-page/byElectron">
          <p>Electronics</p>
        </Link>

        <Link href="/category-page/byHomeThings">
          <p>Home & Lifestyle</p>
        </Link>
        <Link href="/category-page/byMedThings">
          <p>Medicine</p>
        </Link>
        <Link href="/category-page/bySportThings">
          <p>Sports & Outdoor</p>
        </Link>
        <Link href="/category-page/byKidsThings">
          <p>Baby’s & Toys</p>
        </Link>
        <Link href="/category-page/byGroceryThings">
          <p>Groceries & Pets</p>
        </Link>
        <Link href="/category-page/byBeautyThings">
          <p>Health & Beauty</p>
        </Link>
      </div>
    </section>
  );
};

export default CategoryBy;
