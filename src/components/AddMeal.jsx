import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../styles/Button2";
import { Context as MealContext } from "../context/MealContext"
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/Form"

const AddMeal = () => {
    let navigate = useNavigate();
    const [ nombre, setNombre ] = useState("");
    const [ descrp, setDescrp ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ costo, setCosto ] = useState(0);
    const [ proteinas, setProteinas ] = useState(0);
    const [ calorias, setCalorias ] = useState(0);
    const [ carbohi, setCarbohi ] = useState(0);
    const [ grasas, setGrasas ] = useState(0);
    const [ imagen, setImagen ] = useState("");
    const { createMeal } = useContext(MealContext);

    return(
        <main>
            <GlobalStyle />
            <StyledFormWrapper>
            <StyledForm>
                <div className="row" style={{ marginTop: 25, marginLeft: 10, marginRight: 15, marginBottom: 10}}>
                <div className="col">
                        <h1>Agregar platillo:</h1>
                        <br/>
                        <form>
                        <br/>
                            <div className="form-group row">
                                <label for="Nombre:" className="col-sm-3 col-form-label">Nombre</label>
                                <div className="col">
                                    <input type={Text} value={nombre} class="form-control" id="Nombre" onChange={event => setNombre(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Descripción:" className="col-sm-3 col-form-label">Descripción</label>
                                <div className="col">
                                    <textarea class="form-control" value={descrp} id="Descripcion" rows={5} onChange={event => setDescrp(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Tipo:" className="col-sm-3 col-form-label">Tipo</label>
                                <div className="col">
                                    <select class="form-control" id="Tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                                        <option>Elige que tipo de platillo es:</option>
                                        <option value='C' key='C'>Normal</option>
                                        <option value='V' key='V'>Vegetariano</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Costo" className="col-sm-3 col-form-label">Costo</label>
                                <div className="col">
                                    <input type="number" value={costo} class="form-control" id="Costo" onChange={event => setCosto(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Proteinas" className="col-sm-3 col-form-label">Proteinas</label>
                                <div className="col">
                                    <input type="number" value={proteinas} class="form-control" id="Proteinas" onChange={event => setProteinas(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Calorias"className="col-sm-3 col-form-label">Calorias</label>
                                <div className="col">
                                    <input type="number" value={calorias} class="form-control" id="Calorias" onChange={event => setCalorias(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Carbohidratos"  className="col-sm-3 col-form-label">Carbohidratos</label>
                                <div className="col">
                                    <input type="number" value={carbohi} class="form-control" id="Carbohidratos" onChange={event => setCarbohi(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Grasas" className="col-sm-3 col-form-label">Grasas</label>
                                <div className="col">
                                    <input type="number" value={grasas} class="form-control" id="Grasas" onChange={event => setGrasas(event.target.value)}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Foto 1:" className="col-sm-3 col-form-label">Foto 1:</label>
                                <div className="col">
                                    <input type={Text} value={imagen} class="form-control" id="Descripcion" rows={5} onChange={event => setImagen(event.target.value)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/*<div className="col" style={{backgroundColor: 'gray'}}>*/}
                        <div className="container">
                            {/*<TableIngredientsSelect titleTable='Ingredientes'/>*/}
                        </div>
                        <div className="row">
                            <div >
                                <Button 
                                    onClick={() => {
                                        if(tipo===""){
                                            alert('Selecciona que tipo de platillo es.')
                                        }
                                        else{
                                            const confirmacion = window.confirm('¿Seguro que quieres guardar?')
                                            if(confirmacion){
                                                createMeal(nombre, imagen, descrp, tipo, costo, proteinas, calorias, carbohi, grasas);
                                                navigate('/meals')
                                            }
                                        }
                                }} style={{width: 150, height: 50, marginTop: 22, float: 'right'}}>
                                    Registrar
                                </Button>
                                <Button onClick={() => {
                                    const confirmacion = window.confirm('¿Seguro que quieres cancelar? se perderan los datos no guardados.')
                                    if(confirmacion){
                                        navigate('/meals')
                                    }
                                }} style={{width: 150, height: 50, marginTop: 22, float: 'right', backgroundColor: '#ff3838'}}>
                                    Cancelar
                                </Button>
                            </div>
                        {/*</div>*/}
                    </div>
                </div>
            </StyledForm>
            </StyledFormWrapper>
        </main>
    )
}

export default AddMeal;