import React, { useContext, useState } from "react";
import Navbar from "./../Components/Navbar";
import Tilt from "react-parallax-tilt";
import { FavoritesContext } from "../FavoritesContext";
import { useNavigate } from "react-router-dom";

const Mypokemon = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getPokemonImageUrl = (pokemonId) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`; // HOME
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterFavorites = () => {
    if (searchTerm === "") {
      return favorites;
    } else {
      return favorites.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-20">
        <div className="container mx-auto p-4">
          <div className="w-full mb-4">
            <input type="text" placeholder="Search Pokemon..." className="w-full p-2 border-2 border-searchbox rounded-lg focus:outline-none focus:border-btnview transition duration-300" value={searchTerm} onChange={handleSearch} />
          </div>
          {filterFavorites().length === 0 ? (
            <p className="text-2xl font-semibold">No Pokémon found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterFavorites().map((pokemon) => (
                <div key={pokemon.id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-2xl transition duration-300 ease-in-out text-center">
                  <Tilt key={pokemon.id} scale={1.05} gyroscope={true} glareEnable={true} glareMaxOpacity={0.25} glareColor="#ffffff" glarePosition="bottom">
                    <img src={getPokemonImageUrl(pokemon.id)} alt={pokemon.name} className="mx-auto mb-4" style={{ width: "170px", height: "170px" }} />
                  </Tilt>
                  <h3 className="text-xl font-bold mb-2 text-center">{pokemon.name}</h3>
                  <div className="flex justify-evenly">
                    <button onClick={() => navigate(`/pokemon/${pokemon.name}`)} className="shadow-xl bg-gradient-to-tl from-btnview to-paginationnex hover:from-btnviewp hover:to-btnviewd text-whitet font-bold py-2 px-4 rounded-full duration-300">
                      View Details
                    </button>
                    <button className="shadow-xl bg-gradient-to-tl from-backbtnb from-10% to-backbtna to-90% hover:from-btnview hover:to-paginationp text-whitet font-bold py-2 px-4 rounded-full duration-300" onClick={() => removeFromFavorites(pokemon.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Mypokemon;
