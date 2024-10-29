"use client"

import React from 'react'
import scss from "./Welcome.module.scss"
import { FaApple } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import SortByCategory from '@/components/ui/sortByCategory/SortByCategory';



const Welcome = () => {
  return (
    <section className={scss.Welcome}>
        <div className="container">
            <div className={scss.content}> 
                <SortByCategory/>
                <div className={scss.welcome_content}> 
                  <div className={scss.content_text}>

                    <div className={scss.content_logo}>
                      <FaApple/>
                      <p>IPhone 14 Series</p>
                    </div>

                    <p>Up to 10% <br /> off Voucher</p>
                    <button>Shop now <TiArrowRight/> </button>

                  </div>

                  <div className={scss.content_img}></div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Welcome