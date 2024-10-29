"use client";

import React, { useState } from "react";
import scss from "./InputSearchForMob.module.scss";
import { IoReturnDownBack } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
import { useSearchStore } from "@/store/useSearchStore";
import { useRouter } from "next/navigation";

const InputSearchForMob = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchTerm } = useSearchStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    router.push("/results");
  };
  return (
    <section className={scss.InputSearchForMob}>
      <div className={scss.back}>
        <Link href="/">
          <button>
            <IoReturnDownBack />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSearch} className={scss.searchContainer}>
        <input
          type="text"
          placeholder="What are you looking for?"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit">
          <LuSearch />
        </button>
      </form>
    </section>
  );
};

export default InputSearchForMob;
