"use client";
import React, { useState } from "react";
import "./BurgerMenu.css";
import Link from "next/link";
import { useGetUserQuery } from "@/redux/apiAuth/auth";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user, isError } = useGetUserQuery();

  const isAuthenticated = !!user && !isError;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`burger-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link href="/trade">
              <p onClick={scrollToTop}>Trade in</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p onClick={scrollToTop}>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p onClick={scrollToTop}>Contact</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p onClick={scrollToTop}>About</p>
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link href="/auth/user-profile">
                <p onClick={scrollToTop}>Account</p>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/auth/sign-up">
                <p onClick={scrollToTop}>Sign Up</p>
              </Link>
            </li>
          )}
          <li>
            <Link href="/favorite">
              <p onClick={scrollToTop}>Favorite</p>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <p onClick={scrollToTop}>Cart</p>
            </Link>
          </li>
        </ul>

      </nav>
    </>
  );
};

export default BurgerMenu;
