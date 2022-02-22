import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context as SelectedIng } from "../context/SelectedIngContext";
import TableIngredientsSelect from "./TableIngredientsSelect";
import { Context as RecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";


const Recipe = () => {
    const params = useParams();
    const id = params.id;
    const nombrePlatillo = params.nombre;
    const { state: selectedIngredients, reset} = useContext(SelectedIng);
    const { createRecipe } = useContext(RecipeContext);
    const [pasos, setPasos] = useState("");
    const [tiempo, setTiempo] = useState(0);
    let nav = useNavigate()
    let ingredients;
    let time;

    useEffect(() => {
        reset();
    }, [])

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
                                    <TableIngredientsSelect />
                                </div>
                                <div className="row"> 
                                    <div className="d-flex justify-content-center">
                                        <button onClick={() => {
                                            const confirmacion = window.confirm('Seguro que quieres guardar?  ');
                                            if(confirmacion){
                                                ingredients = JSON.stringify(selectedIngredients.map(a => a.id));
                                                time = parseInt(tiempo)
                                                createRecipe(ingredients, pasos, time, id);
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