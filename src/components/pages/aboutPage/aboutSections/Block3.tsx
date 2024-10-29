import React from "react";
import scss from "./Block3.module.scss";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Block3 = () => {
  return (
    <section className={scss.Block3}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <div className={scss.block_img}></div>
            <div className={scss.block_text}>
              <h2>Tom Cruise</h2>
              <p>Founder & Chairman</p>
              <div className={scss.logos}>
                <FiTwitter />
                <FaInstagram />
                <FaLinkedinIn /> 
              </div>
            </div>
          </div>

          <div className={scss.block2}>
            <div className={scss.block_img}></div>
            <div className={scss.block_text}>
              <h2>Emma Watson</h2>
              <p>Managing Director</p>
              <div className={scss.logos}>
                <FiTwitter />
                <FaInstagram />
                <FaLinkedinIn />
              </div>
            </div>
          </div>

          <div className={scss.block3}>
            <div className={scss.block_img}></div>
            <div className={scss.block_text}>
              <h2>Will Smith</h2>
              <p>Product Designer</p>
              <div className={scss.logos}>
                <FiTwitter />
                <FaInstagram />
                <FaLinkedinIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Block3;
