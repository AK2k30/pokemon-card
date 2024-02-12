import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mypokemon from "./Pages/Pokemon";
import NotFound from "./Pages/NotFound";
import PokemonDetail from "./Pages/PokemonDetail";
import { FavoritesProvider } from "./FavoritesContext";
import Landingpage from "./Pages/Landingpage";

const App = () => {
  return (
    <Router>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/mypokemon" element={<Mypokemon />} />
          <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
