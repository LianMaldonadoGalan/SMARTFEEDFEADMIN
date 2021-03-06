import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context as IngredientContext } from "../context/IngredientContext";
import { useNavigate } from "react-router-dom";
import smartFeed from '../api/smartFeed'
import { Button } from "../styles/Button2";
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/FormIngredients"

const ModifyIngredient = () => {
    const { state, getIngredient, patchIngredient } = useContext(IngredientContext);
    const [ nombre, setNombre ] = useState("");
    const [ imagen, setImagen ] = useState("");
    let params = useParams();
    let nav = useNavigate();
    const id = params.id;
    let ing = state.find(i => i.ingredient_id.toString() === id );
    
    useEffect(async () => {    
        setNombre(ing.ingredient_name);
        setImagen(ing.ingredient_picture);
    }, []);
    

    return(
        <main>
            <GlobalStyle />
            <StyledFormWrapper>
            <StyledForm>
            <div className="container-fluid">
                <div  style={{ margin: 50 }}>
                    <div>
                        <h1>Modificar ingrediente:  {ing.ingredient_name}</h1>
                        <br/><br/>
                        {/*form de los ingredientes*/}
                        <div  className="row">
                            <div >
                                <div className="form-group row">
                                    <label for="Nombre:" className="col-sm-3 col-form-label">Nombre:</label>
                                    <div className="col">
                                        <input type={Text} value={nombre} class="form-control" id="Nombre" onChange={event => setNombre(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row">
                                    <label for="Foto 1:" className="col-sm-3 col-form-label">Foto 1:</label>
                                    <div className="col">
                                        <input type={Text} value={imagen} class="form-control" id="Descripcion" rows={5} onChange={event => setImagen(event.target.value)}/>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div style={{marginTop: 20}}>
                                <Button style={{width: 150, height: 50, marginTop: 22, float: 'right'}} onClick={() => {
                                    const confirmacion = window.confirm('Seguro que quieres modificarlo?  ' + nombre);
                                    if(confirmacion){
                                        patchIngredient(id, nombre, imagen)
                                        nav('/ingredients')
                                    }
                                }}>Guardar</Button>
                                <Button onClick={() => {
                                    const confirmacion = window.confirm('??Seguro que quieres cancelar? se perderan los datos no guardados.')
                                    if(confirmacion){
                                        nav('/ingredients')
                                    }
                                }} style={{width: 150, height: 50, marginTop: 22, float: 'right', backgroundColor: '#ff3838'}}>
                                    Cancelar
                                </Button>
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

export default ModifyIngredient;