import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import Pagination from "../Components/Pagination";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); 
    const storedData = JSON.parse(localStorage.getItem("shuffledPokemonList"));

    if (storedData && storedData.date === today) {
      setPokemonList(storedData.list);
    } else {
      getPokemonList(currentPage).then((list) => {
        const shuffledList = shuffleArray(list);
        localStorage.setItem("shuffledPokemonList", JSON.stringify({ date: today, list: shuffledList }));
        setPokemonList(shuffledList);
      });
    }
  }, [currentPage]);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const getPokemonList = (page) => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 60}&limit=60`)
      .then((response) => {
        const promises = response.data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        });
        return Promise.all(promises).then((pokemonData) => {
          return pokemonData.map((data) => {
            return {
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
            };
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePokemonDetails = (name) => {
    navigate(`/pokemon/${name}`);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        const pokemonData = response.data;
        console.log("Fetched Pokemon Data:", pokemonData);
        navigate.push({
          pathname: `/pokemon/${name}`,
          state: {
            pokemon: pokemonData,
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterPokemonList = () => {
    if (searchTerm === "") {
      return pokemonList;
    } else {
      return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  };

  const getPokemonImageUrl = (pokemonId) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`; // HOME
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-20">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Pokémon List</h1>
          <div className="w-full sm:w-11/12 mb-4">
            <input type="text" placeholder="Search Pokemon..." className="w-full p-2 border-2 border-searchbox rounded-lg focus:outline-none focus:border-btnview transition duration-300" value={searchTerm} onChange={handleSearch} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterPokemonList().map((pokemon) => (
              <div className="rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out text-center">
                <Tilt key={pokemon.id} scale={1.05} gyroscope={true} glareEnable={true} glareMaxOpacity={0.25} glareColor="#ffffff" glarePosition="bottom">
                  <img src={getPokemonImageUrl(pokemon.id)} alt={pokemon.name} className="w-full h-auto max-h-48 object-contain rounded-t-lg" />
                </Tilt>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
                  <button className="shadow-xl bg-gradient-to-tl from-btnview to-paginationnex hover:from-btnviewp hover:to-btnviewd text-whitet font-bold py-2 px-4 rounded-full duration-300" onClick={() => handlePokemonDetails(pokemon.name)}>
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
