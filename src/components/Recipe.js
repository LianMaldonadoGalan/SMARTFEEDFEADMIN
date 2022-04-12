import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context as SelectedIng } from "../context/SelectedIngContext";
import { Context as RecipeContext } from "../context/RecipeContext";
import { Context as IngredientsContext } from "../context/IngredientContext";
import { useNavigate } from "react-router-dom";
import TableIngredientsSelect from "./TableIngredientsSelect";
import DataTable from "react-data-table-component";


const Recipe = () => {
    const params = useParams();
    const id = params.id;
    const nombrePlatillo = params.nombre;
    const { state: selectedIngredients, putIngredients} = useContext(SelectedIng);
    const { state: stateRecipe, createRecipe, updateRecipe} = useContext(RecipeContext);
    const { state: stateIngredients } = useContext(IngredientsContext);
    const [pasos, setPasos] = useState("");
    const [tiempo, setTiempo] = useState(0);
    let nav = useNavigate()
    let ingredients;
    let time;
    let ingredientesReceta = [];

    if(stateRecipe !== undefined){
        const x = JSON.parse(stateRecipe[0].meal_ingredients);
        x.map(b => {
            ingredientesReceta.push(stateIngredients.find(i => i.ingredient_id === b));
            console.log(stateRecipe[0])
            //console.log(ingredientesReceta);
            //put(stateIngredients.find(i => i.ingredient_id === b));
        });
    }
    

    useEffect(() => {
        console.log('Se entro a la receta');
        if(stateRecipe !== undefined){
            setPasos(stateRecipe[0].meal_recipe);
            setTiempo(stateRecipe[0].meal_prep_time);
        }
        
    }, [])

    const columns = [
        {
            name: "Id",
            selector: (row) => row.ingredient_id
          },
        {
            name: "Nombre",
            selector: (row) => row.ingredient_name
        }
    ]; 

    return(
        <div className="container-fluid">
                <div  style={{ margin: 50 }}>
                    <div>
                        <h1>Receta para: {nombrePlatillo}</h1>
                        {/*form de los ingredientes*/}
                        <div  className="row">
                            <div className="col" style={{backgroundColor: 'red'}}>
                                <div className="form-group row">
                                    <label for="Tiempo" className="col-sm-3 col-form-label">Tiempo de preparación:</label>
                                    <div className="col-sm-2">
                                        <input type='number' class="form-control" value={tiempo} id="Tiempo" onChange={event => setTiempo(event.target.value)}/>
                                    </div>
                                    <div className="col-sm">
                                        <span>minutos</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="Pasos:" className="col-sm-3 col-form-label">Pasos:</label>
                                    <div className="col">
                                        <textarea rows={20} class="form-control" value={pasos} id="Pasos" onChange={event => setPasos(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col" style={{backgroundColor: 'blue'}}>
                                <div className="row">
                                    <DataTable 
                                        title='Ingredientes de la receta'
                                        columns={columns}
                                        data={ingredientesReceta}
                                    />
                                </div>
                                <div className="row">
                                    <TableIngredientsSelect titleTable='Nuevos ingredientes'/>
                                </div>
                                <div className="row"> 
                                    <div className="d-flex justify-content-center">
                                        <button onClick={() => {
                                            const confirmacion = window.confirm('Seguro que quieres guardar?  ' + selectedIngredients.map(x=>x.ingredient_id));
                                            if(confirmacion){
                                                ingredients = JSON.stringify(selectedIngredients.map(a => a.ingredient_id));
                                                time = tiempo
                                                let objeto = {
                                                    ingredientes: ingredients,
                                                    tiempo: time,
                                                    mealRecipe: pasos
                                                }
                                                {stateRecipe !== undefined ? updateRecipe(stateRecipe[0].recipe_id, ingredients, pasos, time): createRecipe(ingredients, pasos, time, id);}
                                                nav('/meals');
                                            }
                                        }}>Registrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
        </div>
    )
}

export default Recipe;