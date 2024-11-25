"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function PokeInfo() {
  const params = useParams();
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPokeDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        const pokeData = await response.json();
        setPoke(pokeData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPokeDetail();
  }, []);
  // console.log(poke);

  return (
    <div className="p-24">
      <Link href="/" className="p-3 text-white bg-blue-500 rounded-md">
        Go Back
      </Link>
      <div className="flex items-center justify-center mt-10 text-center">
        <div className="p-10 rounded-md shadow-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {poke.sprites && (
                <>
                  <h3 className="text-3xl">{poke.name}</h3>

                  <Image
                    src={poke.sprites?.other.home.front_default}
                    width={300}
                    height={300}
                    alt={poke.name}
                  />
                  <div className="mt-5">
                    <p className="my-3">Weight: {poke.weight}</p>
                    <p className="my-3">
                      Abilitie:{" "}
                      {poke.abilities?.map((val) => (
                        <span
                          key={val.ability.name}
                          className="px-3 py-1 text-white bg-gray-500 rounded-md"
                        >
                          {val.ability.name}
                        </span>
                      ))}
                    </p>
                    <p className="my-3">
                      Type:{" "}
                      {poke.types?.map((val) => (
                        <span
                          key={val.type.name}
                          className="px-3 py-1 text-white bg-gray-500 rounded-md"
                        >
                          {val.type.name}
                        </span>
                      ))}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeInfo;
