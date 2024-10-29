"use client";

import React from "react";
import scss from "./SortByCategory.module.scss";
import Link from "next/link";

const SortByCategory = () => {
  return (
    <section className={scss.SortBy}>
      <div className="container_for_sort">
        <div className={scss.content}>
          <div className={scss.sort1}>
            <Link href="/category-page/byFemale">
              <p>Woman’s Fashion</p>
            </Link>
          </div>

          <div className={scss.sort2}>
            <Link href="/category-page/byMale">
              <p>Man’s Fashion</p>
            </Link>
          </div>

          <Link href='/category-page/byElectron'>
            <p>Electronics</p>
          </Link>
          
          <Link href='/category-page/byHomeThings'>
          <p>Home & Lifestyle</p>
          </Link>
          <Link href='/category-page/byMedThings'>
          <p>Medicine</p>
          </Link>
          <Link href='/category-page/bySportThings'>
          <p>Sports & Outdoor</p>
          </Link>
          <Link href='/category-page/byKidsThings'>
          <p>Baby’s & Toys</p>
          </Link>
          <Link href='/category-page/byGroceryThings'>
          <p>Groceries & Pets</p>
          </Link>
          <Link href='/category-page/byBeautyThings'>
          <p>Health & Beauty</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SortByCategory;
