"use client"

import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        zIndex: '999',
        bottom: '90px',
        right: '20px',
        padding: '15px 17px',
        fontSize: '16px',
        backgroundColor: 'rgb(16, 16, 16)',
        color: 'white',
        border: '1px solid white',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
    >
      <IoIosArrowUp/>
    </button>
  );
};

export default ScrollToTopButton;
