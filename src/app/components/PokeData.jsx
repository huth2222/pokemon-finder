"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function PokeData() {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("Data from state: ", poke);
  useEffect(() => {
    setLoading(true);
    const fetchPokeData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const pokeData = await response.json();
        setPoke(pokeData.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPokeData();
  }, []);
  return (
    <div className="container mx-auto text-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5">
          {poke.map((val, index) => (
            <Link
              key={val.name}
              href={`/pokeinfo/[id]`}
              as={`/pokeinfo/${index + 1}`}
            >
              <div
                key={index}
                className="flex items-center justify-center m-3 transition rounded-md shadow-md cursor-pointer hover:shadow-lg"
              >
                <div>
                  <h3>{val.name}</h3>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      index + 1
                    }.png`}
                    width={150}
                    height={150}
                    alt={val.name}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokeData;
