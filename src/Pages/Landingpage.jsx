import React from "react";
import { useNavigate } from "react-router-dom";
// import pokemonBallImage from "../Photo/pokeball-pokemon-removebg.png";

const Landingpage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-landingpc to-landingpa">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-whitet mb-8">Welcome to Pokécard</h1>
          <p className="text-xl font-semibold text-whitet mb-8">Discover and explore all your favorite Pokémon!</p>
          <div className="flex items-center justify-center flex-wrap flex-col">
            <div>
              <button onClick={() => navigate("/home")} className="bg-whitet text-landingpa hover:bg-primary hover:text-whitet text-lg font-bold py-3 px-6 duration-300 rounded-full shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
