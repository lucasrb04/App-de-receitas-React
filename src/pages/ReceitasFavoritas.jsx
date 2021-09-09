import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import RecipesContext from '../Context/RecipesContext';
import ShareButtonPerfil from '../components/ShareButtonPerfil';
import ScreenFavoriteButton from '../components/ScreenFavoriteButton';

function ReceitasFavoritas() {
  const { favoriteFilters } = useContext(RecipesContext);
  const history = useHistory();
  const areaAndCategory = (area, category) => category
  && `${area} - ${category}`;

  return (
    <main>
      <Header />
      <FiltersButtons />
      <div className="divCard">
        { favoriteFilters === null
          ? <p />
          : favoriteFilters.map((
            {
              image,
              category,
              name,
              id,
              area,
              type,
              alcoholicOrNot,
            }, index,
          ) => (
            <CardGroup key={ id } className="main-card">
              <Card
                border="dark"
                // style={ { width: '15rem' } }
                className="mb-2 shadownCard xablau"
                bg="dark"
                text="white"
              >
                <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
                  <Card.Img
                    variant="top"
                    src={ image }
                    alt="xxxx"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </button>
                <Card.Body>
                  <button type="button" onClick={ () => history.push(`/${type}s/${id}`) } className="iconsBackground">
                    <Card.Title
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </Card.Title>
                  </button>
                  <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                    { areaAndCategory(area, category) }
                  </Card.Text>
                  {
                    alcoholicOrNot
                && <Card.Text data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</Card.Text>
                  }
                </Card.Body>
                <Card.Footer className="card-footer">
                  <ShareButtonPerfil type={ type } id={ id } index={ index } />
                  <ScreenFavoriteButton
                    id={ id }
                    index={ index }
                  />
                </Card.Footer>
              </Card>
            </CardGroup>
          ))}
      </div>
    </main>
  );
}

export default ReceitasFavoritas;
