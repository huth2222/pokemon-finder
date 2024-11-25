"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Header() {
  const router = useRouter();
  const [pokeName, setPokename] = useState("");

  const handleInput = (e) => {
    setPokename(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    router.push(`/pokesearch/${pokeName}`);
  };
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 h-[300px] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl text-white">NextJS Pokemon Finder App</h1>
        <p className="text-2xl text-white">Find your favourite Pokemon</p>
        <form onSubmit={handleForm} className="flex mt-2">
          <input
            type="text"
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
            placeholder="Pokemon Name..."
            onChange={handleInput}
          />
          <button
            className="inline-flex items-center px-4 py-2 mx-2 text-white bg-green-500 rounded-md shadow-md"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
