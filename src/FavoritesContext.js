import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  const removeFromFavorites = (pokemonId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((pokemon) => pokemon.id !== pokemonId));
  };

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
