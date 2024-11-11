"use client";

import React from "react";
import scss from "./SectionAdition.module.scss";
import { TbKeyframes } from "react-icons/tb";
import { RiDashboard2Line } from "react-icons/ri";
import { FaDisplay } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";

const SectionAdition1 = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className={scss.Section5}>
      <div className="container">
        <div className={scss.main_content}>
          <h1>
            Best <br /> laptop this month
          </h1>

          <div className={scss.content}>
            <div className={scss.block1}>
              <div className={scss.main_box}>
                <div className={scss.box}>
                  <div className={scss.box_item}>
                    <div className={scss.item}>
                      <h5>Frame</h5>
                      <TbKeyframes />
                    </div>
                    <p>
                      It is a long established fact that <br /> a reader will be
                      distracted by <br /> the readable content of
                    </p>
                  </div>
                  <div className={scss.box_item}>
                    <div className={scss.item}>
                      <h5>Performance</h5>
                      <RiDashboard2Line />
                    </div>
                    <p>
                      The point of using lorem ipsum <br /> is that it has a
                      more-or-less <br /> normal distribution of letters
                    </p>
                  </div>
                </div>

                <div className={scss.box}>
                  <div className={scss.box_item}>
                    <div className={scss.item}>
                      <h5>Display</h5>
                      <FaDisplay />
                    </div>
                    <p>
                      Many desktop publishing <br /> packages and web page{" "}
                      <br /> editors now use lorem ipsum as
                    </p>
                  </div>
                  <div className={scss.box_item}>
                    <div className={scss.item}>
                      <h5>Service</h5>
                      <CiSettings />
                    </div>
                    <p>
                      Contrary to popular belief, <br /> lorem ipsum is not
                      simply <br /> random text. It has roots in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={scss.block2}>
              <img
                src="https://w0.peakpx.com/wallpaper/636/836/HD-wallpaper-colorful-laptop-with-black-background-black-aesthetic-thumbnail.jpg"
                alt=""
              />
              <div className="container_for_lap">
                <p>
                  A laptop is a lightweight, portable computer ideal for work,
                  study, and entertainment. Equipped with powerful processors,
                  high-resolution displays, ample storage, and long-lasting
                  battery life, it supports multitasking and productivity.
                  Built-in Wi-Fi, Bluetooth, and USB ports allow seamless
                  connectivity, making it a versatile tool for users everywhere.
                </p>
              </div>
              <Link href="/trade">
                <button onClick={scrollToTop}>Trade in</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAdition1;
