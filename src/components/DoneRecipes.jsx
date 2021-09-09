import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import RecipesContext from '../Context/RecipesContext';
import ShareButtonPerfil from './ShareButtonPerfil';

export default function DoneRecipes() {
  const { favoriteFilters } = useContext(RecipesContext);

  if (favoriteFilters === null) {
    return (
      <p />
    );
  }
  return (
    <main className="divCard">
      {favoriteFilters.map(
        (
          {
            image,
            category,
            name,
            id,
            doneDate,
            type,
            tags,
            area,
            alcoholicOrNot,
          },
          index,
        ) => (
          <CardGroup key={ id } className="main-card">
            <Card
              border="dark"
              className="mb-2 shadownCard xablau"
              bg="dark"
              text="white"
            >
              <Link to={ `/${type}s/${id}` }>
                <Card.Img
                  variant="top"
                  src={ image }
                  alt="xxxx"
                  data-testid={ `${index}-horizontal-image` }
                  width="50px"
                />
              </Link>
              <Card.Body>
                <ShareButtonPerfil id={ id } type={ type } index={ index } />
                <br />
                <Link to={ `/${type}s/${id}` }>

                  <Card.Title style={ { color: 'white' } } data-testid={ `${index}-horizontal-name` }>{name}</Card.Title>

                </Link>
                {area === '' ? null : (
                  <Card.Title
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${area} - ${category} `}

                  </Card.Title>
                )}
                {alcoholicOrNot === '' ? null : (
                  <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </Card.Text>
                )}
                <Card.Title data-testid={ `${index}-horizontal-top-text` }>{type}</Card.Title>
                <Card.Text data-testid={ `${index}-horizontal-done-date` }>{doneDate}</Card.Text>
                <div>
                  {tags[0] === null ? (
                    <p />
                  ) : (
                    tags.map((tag, i) => (
                      <Card.Text key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                        {tag}
                      </Card.Text>
                    ))
                  )}
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        ),
      )}
    </main>
  );
}
