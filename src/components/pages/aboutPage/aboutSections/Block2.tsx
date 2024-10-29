import React from 'react'
import scss from './Block2.module.scss'
import { BsShop } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { FaSackDollar } from "react-icons/fa6";


const Block2 = () => {
  return (
    <section className={scss.Block2}>
        <div className="container">
            <div className={scss.content}>
                <div className={scss.box}>
                    <BsShop/>
                    <h3>10.5k </h3>
                    <p>Sallers active our site</p>
                </div>
                <div className={scss.box}>
                    <FiDollarSign/>
                    <h3>33k</h3>
                    <p>Mopnthly Produduct Sale</p>
                </div>
                <div className={scss.box}>
                    <GoGift/>
                    <h3>45.5k</h3>
                    <p>Customer active in our site</p>
                </div>
                <div className={scss.box}>
                    <FaSackDollar/>
                    <h3>25k</h3>
                    <p>Anual gross sale in our site</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Block2