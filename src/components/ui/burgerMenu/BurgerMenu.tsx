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
              <p>Trade in</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p>About</p>
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link href="/auth/user-profile">
                <p>Account</p>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/auth/sign-up">
                <p>Sign Up</p>
              </Link>
            </li>
          )}
          <li>
            <Link href="/favorite">
              <p>Favorite</p>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <p>Cart</p>
            </Link>
          </li>
        </ul>

      </nav>
    </>
  );
};

export default BurgerMenu;
