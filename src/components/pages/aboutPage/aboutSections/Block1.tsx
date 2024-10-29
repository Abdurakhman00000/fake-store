"use client";
import React from "react";
import scss from "./Block1.module.scss";

const Block1 = () => {
  return (
    <section className={scss.Block1}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block_text}>
            <h1>Our Story</h1>
            <p>
              Launced in 2015, Exclusive is South Asia’s premier online shopping{" "}
              <br />
              makterplace with an active presense in Bangladesh. Supported{" "}
              <br /> by wide range of tailored marketing, data and service
              solutions, <br />
              Exclusive has 10,500 sallers and 300 brands and serves 3 <br />{" "}
              millioons customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a <br />
              very fast. Exclusive offers a diverse assotment in categories <br />
              ranging from consumer.
            </p>
          </div>
          <div className={scss.block_img}></div>
        </div>
      </div>
    </section>
  );
};

export default Block1;
