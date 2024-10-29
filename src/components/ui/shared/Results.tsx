"use client";

import { useGetAllProductByCategoryQuery, useGetAllProductsQuery } from "@/redux/api/product";
import { useSearchStore } from "@/store/useSearchStore";
import React, { useEffect, useState } from "react";
import scss from "./Results.module.scss";
import Link from "next/link";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { toast } from "react-toastify";
import Header from "@/components/layout/header/Header";
import 'react-medium-image-zoom/dist/styles.css';
import Loader from "../loader/Loader";
import Footer from "@/components/layout/footer/Footer";

interface IProductFromApi {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

const Results = () => {
  const { searchTerm } = useSearchStore();
  const { data: productsData } = useGetAllProductsQuery();
  const { data: otherData } = useGetAllProductByCategoryQuery();;
  const [filteredProducts, setFilteredProducts] = useState<IProductFromApi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if ((productsData || otherData) && searchTerm) {
      setIsLoading(true);

      setTimeout(() => {
        const combinedData = [...(productsData || []), ...(otherData || [])];
        const filtered = combinedData.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filtered);
        setIsLoading(false);
      }, 2000);
    }
  }, [productsData, otherData, searchTerm]);

  const addToCart = useCartStore((state) => state.addToCart);

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleAddToCart = (item: IProductFromApi) => {
    const itemWith: CartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    addToCart(itemWith);
    toast.success(`${item.title} добавлено в корзину!`, {
      className: scss["toast-custom"],
      position: "top-right",
      autoClose: 1500,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={scss.Results}>
      <Header />
      <div className="container">
        <div className={scss.content}>
          <div className={scss.main_item}>
            {isLoading ? (
              <div><Loader /></div>
            ) : filteredProducts.length > 0 ? (
              <div className={scss.result_card}>
                {filteredProducts.map((item) => (
                  <div key={item.id} className={scss.item_card}>
                    <Link href={`/item-details/${item.id}`}>
                      <div onClick={scrollToTop} className={scss.item_img}>
                        {item.image ? (
                          <img src={item.image} alt="" />
                        ) : (
                          <img src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png" alt="" />
                        )}
                      </div>
                    </Link>

                    <div className={scss.item_text}>
                      <h3>{truncateText(item.title, 16)}</h3>
                      <p>{item.price} сом</p>
                    </div>

                    <button onClick={() => handleAddToCart(item)}>
                      В корзину
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '-40px' }}>
                  <img width={300} height={330} style={{ borderRadius: '20%' }} src="https://static.tildacdn.net/tild3432-3335-4337-b130-363866343062/No_results_1.svg" alt="" />
                  <p style={{ marginTop: '-37px', fontSize: '19px' }}>Oops!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Results;
