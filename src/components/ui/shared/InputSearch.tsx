"use client"

import React, { useState } from "react";
import scss from "./InputSearch.module.scss";
import { LuSearch } from "react-icons/lu";
import { useSearchStore } from "@/store/useSearchStore";
import { useRouter } from "next/navigation";

const InputSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchTerm } = useSearchStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    router.push('/results');
  }

  return (
    <section className={scss.InputSearch}>
      <form onSubmit={handleSearch} className={scss.searchContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What are you looking for?"
          className={scss.searchInput}
        />
        <button type="submit" className={scss.searchButton}>
          <LuSearch />
        </button>
      </form>
    </section>
  );
};

export default InputSearch;