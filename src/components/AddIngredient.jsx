import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context as IngredientContext } from "../context/IngredientContext";
import { Button } from "../styles/Button2";
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/FormIngredients"

const AddIngredient = () => {
    let navigate = useNavigate();

    const { createIngredient } = useContext(IngredientContext);
    const [ nombre, setNombre ] = useState("");
    const [ imagen, setImagen ] = useState("");


    return(
        <main>
            <GlobalStyle />
            <StyledFormWrapper>
            <StyledForm>
            <div className="container-fluid">
                <div style={{ margin: 30 }}>
                    <div>
                        <h1>Agregar Ingrediente:</h1>
                        <br/><br/>
                        {/*form de los ingredientes*/}
                        <div  className="row">
                            <div >
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
                            </div>
                            <div style={{marginTop: 20}}>
                                <Button style={{width: 150, height: 50, marginTop: 22, float: 'right'}} onClick={() => {
                                    const confirmacion = window.confirm('Seguro que quieres guardar?  ' + nombre);
                                    if(confirmacion){
                                        createIngredient(nombre, imagen);
                                        navigate('/ingredients')
                                    }
                                }}>Registrar</Button>
                                <Button onClick={() => {
                                    const confirmacion = window.confirm('¿Seguro que quieres cancelar? se perderan los datos no guardados.')
                                    if(confirmacion){
                                        navigate('/ingredients')
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

export default AddIngredient;