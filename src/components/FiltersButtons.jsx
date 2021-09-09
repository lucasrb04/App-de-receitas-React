import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import RecipesContext from '../Context/RecipesContext';

export default function FiltersButtons() {
  const { pathname } = useLocation();
  let favoriteRecipesStorage = [];
  if (pathname.includes('/receitas-favoritas')) {
    favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  } else {
    favoriteRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  const { setFavoriteFilters } = useContext(RecipesContext);
  const filterFood = () => {
    const filter = favoriteRecipesStorage.filter(({ type }) => type === 'comida');
    setFavoriteFilters(filter);
  };

  const filterDrink = () => {
    const filterDrinks = favoriteRecipesStorage.filter(({ type }) => type === 'bebida');
    setFavoriteFilters(filterDrinks);
  };

  const filterAll = () => {
    const filters = favoriteRecipesStorage;
    setFavoriteFilters(filters);
  };

  useEffect(filterAll, []);

  return (
    <div className="recipeFavorites">
      <Button
        variant="outline-danger"
        size="lg"
        className="buttonsFilters"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All

      </Button>
      <Button
        variant="outline-danger"
        size="lg"
        className="buttonsFilters"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFood }
      >
        Food

      </Button>
      <Button
        variant="outline-danger"
        size="lg"
        className="buttonsFilters"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrink }
      >
        Drinks

      </Button>
    </div>
  );
}
