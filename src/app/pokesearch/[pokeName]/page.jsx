"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function PokeResult() {
  const params = useParams();
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(params);

  const fetchPokeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.pokeName}`
      );
      const data = await response.json();
      setPokeData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokeData();
  }, []);
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
              {pokeData.sprites && (
                <>
                  <h3 className="text-3xl">{pokeData.name}</h3>

                  <Image
                    src={pokeData.sprites?.other.home.front_default}
                    width={300}
                    height={300}
                    alt={pokeData.name}
                  />
                  <div className="mt-5">
                    <p className="my-3">Weight: {pokeData.weight}</p>
                    <p className="my-3">
                      Abilitie:{" "}
                      {pokeData.abilities?.map((val) => (
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
                      {pokeData.types?.map((val) => (
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

export default PokeResult;
