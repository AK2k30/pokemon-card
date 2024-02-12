import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [showAllMoves] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, types, weight, height, abilities, moves, stats } = pokemonData;
  const movesToShowCount = showAllMoves ? moves.length : 5;
  const movesToShow = moves.slice(0, movesToShowCount);

  const getPokemonImageUrl = (pokemonId) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`; // HOME
  };

  return (
    <div className="container mx-auto p-4">
      <button className="mb-4 bg-gradient-to-tl from-btnviewd to-btnviewh hover:from-backbtna hover:to-backbtnb text-whitet p-2  rounded-lg font-semibold" onClick={() => navigate("/home")}>
        {" "}
        🏠 Back to Home
      </button>
      <div className="rounded-lg shadow-2xl p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-center">
            <Tilt scale={1.05} gyroscope={true} glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffffff" >
              <img src={getPokemonImageUrl(pokemonData.id)} alt={name} className="mx-auto max-w-full" style={{ width: "200px", height: "200px" }} />
            </Tilt>
          </div>
          <div>
            <div className="grid grid-cols-2 justify-items-center gap-4">
              <div>
                <h3 className="text-xl font-bold my-2">Type</h3>
                <ul>
                  {types.map((type) => (
                    <li key={type.slot}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold my-2">Weight</h3>
                <p>{weight}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold my-2">Height</h3>
                <p>{height}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold my-2">Abilities</h3>
                <ul>
                  {abilities.map((ability) => (
                    <li key={ability.slot}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 justify-items-center gap-4">
              <div className="ml-8 md:ml-0">
                <h3 className="text-xl font-bold my-2">Moves</h3>
                <ul>
                  {movesToShow.map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
                
              </div>
              <div className="ml-16 md:ml-0">
                <h3 className="text-xl font-bold my-2">Stats</h3>
                <ul>
                  {stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
