import React from 'react';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import DoneRecipes from '../components/DoneRecipes';

function ReceitasFeitas() {
  return (
    <main>
      <Header />
      <FiltersButtons />
      <DoneRecipes />
    </main>
  );
}
export default ReceitasFeitas;
