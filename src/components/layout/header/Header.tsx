"use client";

import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import { GrFavorite } from "react-icons/gr";
import { BsCart3 } from "react-icons/bs";
import { usePathname } from "next/navigation";
import BurgerMenu from "@/components/ui/burgerMenu/BurgerMenu";
import { links } from "@/constans/links";
import Link from "next/link";
import InputSearch from "@/components/ui/shared/InputSearch";
import { useGetUserQuery } from "@/redux/apiAuth/auth";
import { LuSearch } from "react-icons/lu";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Badge } from "@mui/material";
import useCartStore from "@/store/useCartStore";
import { BiCategory } from "react-icons/bi";

const Header = () => {
  const { data: user, isError } = useGetUserQuery();
  const favoritesLength = useFavoriteStore((state) => state.favorites.length);
  const cartLength = useCartStore((state) => state.cart.length);

  const isAuthenticated = !!user && !isError;
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Устанавливаем начальное значение isMobile на клиентской стороне
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className={scss.Header}>
      <div className={scss.content}>
        <div className={scss.pre_header}>
          <div className={scss.header_line}>
            <p>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </p>
            <span>Shop now!</span>
          </div>

          <div className={scss.header_switch_lang}>
            <select>
              <option>English</option>
              <option>Русский</option>
            </select>
          </div>
        </div>

        <div className={scss.main_header}>
          <div className="container">
            <div className={scss.header}>
              <div className={scss.header_logo}>
                <Link href="/">
                  <h1>AShop</h1>
                </Link>
              </div>

              <div className={scss.adaptive_nav}>
                {isMobile ? (
                  <div className={scss.layoutForMob}>
                    <BurgerMenu />
                  </div>
                ) : isAuthenticated ? (
                  <nav className={scss.nav}>
                    <ul>
                      {links.slice(0, 4).map((item, index) => (
                        <li key={index}>
                          <Link
                            className={
                              pathname === item.href
                                ? `${scss.link} ${scss.active}`
                                : `${scss.link}`
                            }
                            href={item.link}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <nav className={scss.nav}>
                    <ul>
                      {links.map((item, index) => (
                        <li key={index}>
                          <Link
                            className={
                              pathname === item.href
                                ? `${scss.link} ${scss.active}`
                                : `${scss.link}`
                            }
                            href={item.link}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>

              <div className={scss.header_active}>
                <div className={scss.category_mob}>
                  <Link href="/category-page">
                    <BiCategory />
                  </Link>
                </div>
                <InputSearch />
                <div className={scss.search_mob}>
                  <Link href="/search">
                    <LuSearch />
                  </Link>
                </div>
                <Link onClick={scrollToTop} href="/favorite">
                  <Badge
                    badgeContent={favoritesLength}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    <GrFavorite />
                  </Badge>
                </Link>

                <Link onClick={scrollToTop} href="/cart">
                  <Badge
                    badgeContent={cartLength}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    <BsCart3 />
                  </Badge>
                </Link>

                <div>
                  {isAuthenticated ? (
                    user?.profile.photo ? (
                      <Link href="/auth/user-profile">
                        <img
                          onClick={scrollToTop}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          width={40}
                          height={40}
                          src={user?.profile.photo}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <img
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        width={50}
                        height={50}
                        src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                        alt=""
                      />
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
