import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context as SelectedIng } from "../context/SelectedIngContext";
import { Context as RecipeContext } from "../context/RecipeContext";
import { Context as IngredientsContext } from "../context/IngredientContext";
import { useNavigate } from "react-router-dom";
import TableIngredientsSelect from "./TableIngredientsSelect";
import DataTable from "react-data-table-component";
import { Button } from "../styles/Button2";
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/Form2"


const Recipe = () => {
    const params = useParams();
    const id = params.id;
    const nombrePlatillo = params.nombre;
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );
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
        <main>
        <GlobalStyle />
            <StyledFormWrapper>
            <StyledForm>
                <div style={{ margin: 20 }}>
                    <div>
                        <h1>Receta para: {nombrePlatillo}</h1>
                        <br/>
                        {/*form de los ingredientes*/}
                        <div  className="row">
                            <div className="col" style={{borderBlockStart: '2px solid rgba(120, 164, 75, 0.56)', borderRight: '1.5px solid rgba(120, 164, 75, 0.56)', paddingRight: 30}} >
                                <br/>
                                <div className="form-group row">
                                    <label for="Tiempo" className="col-sm-3 col-form-label">Tiempo de preparación:</label>
                                    <div className="col-sm-2">
                                        <input style={{marginTop: 12}}
                                        type='number'
                                        min={0} 
                                        onkeyup="if(this.value<0){this.value= this.value * -1}"
                                        value={tiempo} class="form-control" id="Tiempo" onChange={event => setTiempo(event.target.value)}/>
                                    </div>
                                    <div className="col-sm" style={{marginTop: 17}}>
                                        <span  >minutos.</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="Pasos:" className="col-sm-3 col-form-label">Pasos:</label>
                                    <br/><br/>
                                    <div className="col">
                                        <textarea rows={20} class="form-control" value={pasos} id="Pasos" onChange={event => setPasos(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col" style={{borderBlockStart: '2px solid rgba(120, 164, 75, 0.56)' , paddingLeft: 30}}>
                                <div className="row">
                                    <DataTable 
                                        title='Ingredientes actuales de la receta'
                                        columns={columns}
                                        data={ingredientesReceta}
                                        pagination
                                        paginationResetDefaultPage={resetPaginationToggle}
                                        paginationPerPage={5}
                                        
                                    />
                                </div>
                                <div className="row">
                                    <TableIngredientsSelect titleTable='Nuevos ingredientes'/>
                                </div>
                                <div className="row"> 
                                    <div>
                                        <Button style={{width: 150, height: 50, marginTop: 22, float: 'right'}} onClick={() => {
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
                                        }}>Registrar</Button>
                                        <Button onClick={() => {
                                                const confirmacion = window.confirm('¿Seguro que quieres cancelar? se perderan los datos no guardados.')
                                                if(confirmacion){
                                                    nav('/meals')
                                                }
                                            }} style={{width: 150, height: 50, marginTop: 22, float: 'right', backgroundColor: '#ff3838'}}>
                                                Cancelar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                </StyledForm>
            </StyledFormWrapper>
            </main>
    )
}

export default Recipe;