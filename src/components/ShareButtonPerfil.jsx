import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButtonPerfil({ type, id, index }) {
  const [msgCopy, setMsgCopy] = useState(false);

  const TWO_SECONDS = 2000;
  const shareLink = () => {
    let url = '';
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
      copy(url);
    } else {
      url = `http://localhost:3000/bebidas/${id}`;
      copy(url);
    }
    setMsgCopy(!msgCopy);
    setTimeout(() => {
      setMsgCopy(false);
    }, TWO_SECONDS);
  };
  return (
    <div>
      <div>
        {msgCopy ? 'Link copiado!' : ''}
      </div>
      <button type="button" onClick={ shareLink } className="iconsBackground">
        {msgCopy ? 'Link copiado!' : <img
          src={ shareIcon }
          alt="botão de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />}
      </button>
    </div>
  );
}

ShareButtonPerfil.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
