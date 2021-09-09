import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

import { fetchMealsIngredients, fetchIngredientesMeal } from '../Service/foodApi';
import { fetchDrinksIngredients, fetchIngredientesDrinks } from '../Service/drinkApi';
import RecipesContext from '../Context/RecipesContext';

export default function CardIngredient() {
  const twelve = 12;
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  let src = '';
  let positionInArray;

  const { setResponseApiLupaMeal,
    setResponseApiLupaDrink } = useContext(RecipesContext);
  const [ingredientArray, setIngredientsArray] = useState([]);

  if (pathname.includes('comidas')) {
    positionInArray = 1;
    src = 'https://www.themealdb.com/images/ingredients/';
  } else {
    positionInArray = 0;
    src = 'https://www.thecocktaildb.com/images/ingredients/';
  }

  const getApi = () => {
    if (pathname.includes('comidas')) {
      fetchMealsIngredients().then((response) => setIngredientsArray(response));
    } else {
      fetchDrinksIngredients().then((response) => setIngredientsArray(response));
    }
  };
  useEffect(getApi, []);
  let finalArray = ingredientArray;
  const path = positionInArray === 0 ? '/bebidas' : '/comidas';

  const fetchByingredient = (innerHTML) => {
    const DELAY_FETCH = 300;
    if (pathname.includes('comidas')) {
      fetchIngredientesMeal(innerHTML)
        .then((response) => {
          setResponseApiLupaMeal(response);
        });
      setTimeout(() => history.push(path), DELAY_FETCH);
    } else {
      fetchIngredientesDrinks(innerHTML)
        .then((response) => {
          setResponseApiLupaDrink(response);
        });
      setTimeout(() => history.push(path), DELAY_FETCH);
    }
  };

  if (ingredientArray.length > twelve) {
    finalArray = ingredientArray.filter((_e, index) => index < twelve);
  }
  if (finalArray) {
    return (
      <main className="explore">
        <ul>
          {finalArray.map((obj, index) => (
            <CardGroup key={ index } className="main-card">
              <Card
                border="dark"
                className="mb-2 shadownCard xablau"
                bg="dark"
                text="white"
                style={ { margin: '50px' } }
              >
                <button
                  type="button"
                  key={ index }
                  onClick={ () => fetchByingredient(Object.values(obj)[positionInArray]) }
                  data-testid={ `${index}-ingredient-card` }
                >
                  <Card.Img
                    variant="top"
                    src={ `${src}${Object.values(obj)[positionInArray]}-Small.png` }
                    alt="xxxx"
                    data-testid={ `${index}-horizontal-image` }
                    width="50px"
                  />
                  <Card.Body>
                    {/* <img
                width="80px"

                alt="imagem do ingrediente"
                data-testid={ `${index}-card-img` }
              /> */}
                    <div data-testid={ `${index}-card-name` }>
                      { Object.values(obj)[positionInArray] }
                    </div>

                  </Card.Body>
                </button>
              </Card>
            </CardGroup>
          ))}
        </ul>
      </main>
    );
  }
}
