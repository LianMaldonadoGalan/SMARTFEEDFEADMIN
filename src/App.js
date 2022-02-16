import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddMeal from './components/AddMeal';
import AddIngredient from './components/AddIngredient';
import Ingredients from './components/Ingredients';
import Meals from './components/Meals'
import ModifyMeal from './components/ModifyMeal'
import ModifyIngredient from './components/ModifyIngredient';
import DrawerTemp from './components/DrawerTemp';
import { Provider as MealProvider } from './context/MealContext'
import { Provider as IngredientProvider } from './context/IngredientContext'

function App() {
  return (
    <IngredientProvider>
      <MealProvider>
        <DrawerTemp />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/meals' element={<Meals />}/>
          <Route path='/ingredients' element={<Ingredients />}/>
          <Route path='/add-meal' element={<AddMeal />}/>
          <Route path='/add-ingredients' element={<AddIngredient />}/>
          <Route path='/modify-meal/:id' element={<ModifyMeal />} />
          <Route path='/modify-ingredient/:id' element={<ModifyIngredient />} />
        </Routes>
      </MealProvider>
    </IngredientProvider>
  );
}

export default App;