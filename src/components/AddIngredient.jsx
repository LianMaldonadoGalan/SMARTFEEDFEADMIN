import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context as IngredientContext } from "../context/IngredientContext";

const AddIngredient = () => {
    let navigate = useNavigate();

    const { createIngredient } = useContext(IngredientContext);
    const [ nombre, setNombre ] = useState("");
    const [ imagen, setImagen ] = useState("");

    return(
        <main>
            <div className="container-fluid">
                <div  style={{ margin: 50 }}>
                    <div>
                        <h1>Ingredientes</h1>
                        <form  className="row" action="">
                            <div className="col" style={{backgroundColor: 'red'}}>
                                <div className="form-group row">
                                    <label for="Nombre:" className="col-sm-3 col-form-label">Nombre:</label>
                                    <div className="col">
                                        <input type={Text} class="form-control" id="Nombre" onChange={event => setNombre(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row">
                                    <label for="Foto 1:" className="col-sm-3 col-form-label">Foto 1:</label>
                                    <div className="col">
                                        <input type={Text} class="form-control" id="Descripcion" rows={5} onChange={event => setImagen(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row">
                                    <label for="Foto 2:" className="col-sm-3 col-form-label">Foto 2:</label>
                                    <div className="col">
                                        <input type={Text} class="form-control" id="Descripcion" rows={5}/>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row">
                                    <label for="Foto 3:" className="col-sm-3 col-form-label">Foto 3:</label>
                                    <div className="col">
                                        <input type={Text} class="form-control" id="Descripcion" rows={5}/>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col" style={{backgroundColor: 'blue'}}>
                                <button onClick={() => {
                                    const confirmacion = window.confirm('Seguro que quieres guardar?  ' + nombre);
                                    if(confirmacion){
                                        createIngredient(nombre, imagen);
                                        navigate('/ingredients')
                                    }
                                }}>Registrar</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </main>
    )
}

export default AddIngredient;