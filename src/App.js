import React, {useState, useEffect} from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import Signin from './components/Signin';
import AddMeal from './components/AddMeal';
import AddIngredient from './components/AddIngredient';
import Ingredients from './components/Ingredients';
import Meals from './components/Meals'
import ModifyMeal from './components/ModifyMeal'
import ModifyIngredient from './components/ModifyIngredient';
import Recipe from './components/Recipe';
import DrawerTemp from './components/DrawerTemp';
import { Provider as MealProvider } from './context/MealContext';
import { Provider as IngredientProvider } from './context/IngredientContext';
import { Provider as SelectedIng } from './context/SelectedIngContext';
import { Provider as RecipeProvider } from './context/RecipeContext';
import { Provider as AuthProvider } from './context/AuthContext';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, [])

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user])

  return (
    <RecipeProvider>
      <SelectedIng>
        <IngredientProvider>
          <MealProvider>
          <AuthProvider>
            {user && (
              <DrawerTemp logout={() => setUser(false)}/>
            )}
            <Routes>
              {!user && (
                <Route path='/' element={<Signin authenticate={() => setUser(true)}/>} />
              )}
              {user && (
                <>
                  <Route path='/meals' element={<Meals />} />
                  <Route path='/ingredients' element={<Ingredients />}/>
                  <Route path='/add-meal' element={<AddMeal />}/>
                  <Route path='/add-ingredients' element={<AddIngredient />}/>
                  <Route path='/modify-meal/:id' element={<ModifyMeal />} />
                  <Route path='/modify-ingredient/:id' element={<ModifyIngredient />} />
                  <Route path='/recipe/:id/:nombre' element={<Recipe />} />
                </>
              )}
                <Route path='*' element={<Navigate to={user ? "/meals" : "/"} />} />
            </Routes>
            </AuthProvider>
          </MealProvider>
        </IngredientProvider>
      </SelectedIng>
    </RecipeProvider>
  );
}


export default App;
