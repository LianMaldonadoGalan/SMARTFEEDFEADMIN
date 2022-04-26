import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { Button } from "../styles/Button2";
import { Context as MealContext } from "../context/MealContext";
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/Form"

const ModifyMeal = () => {
    const { state, getMeal, patchMeal } = useContext(MealContext);
    let params = useParams();
    let nav = useNavigate();
    const id = params.id;
    const [ nombre, setNombre ] = useState("");
    const [ descrp, setDescrp ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ costo, setCosto ] = useState(0);
    const [ proteinas, setProteinas ] = useState(0);
    const [ calorias, setCalorias ] = useState(0);
    const [ carbohi, setCarbohi ] = useState(0);
    const [ grasas, setGrasas ] = useState(0);
    const [ imagen, setImagen ] = useState("");
    const [ carnivoro, setCarnivoro ] = useState(false);
    const [ vegetariano, setVegetariano ] = useState(false);

    const meal = state.find(m => m.id_meal.toString() === id );

    useEffect(() => {

        setNombre(meal.meal_name);
        setDescrp(meal.meal_description);
        setTipo(meal.meal_type);
        setCosto(meal.meal_cost);
        setProteinas(meal.meal_protein);
        setCalorias(meal.meal_calories);
        setCarbohi(meal.meal_carbohydrates);
        setGrasas(meal.meal_fats);
        setImagen(meal.meal_photo);
        if (meal.meal_type === 'C'){
            console.log('car');
            setCarnivoro(true);
        } else {
            console.log('veg');
            setVegetariano(true)
        };
    },[]);


    return(
        <main>
            <GlobalStyle />
            <StyledFormWrapper>
            <StyledForm>
                <div className="row" style={{ marginTop: 25, marginLeft: 10, marginRight: 15, marginBottom: 10 }}>
                    <div className="col">
                        <h1>Platillo: {meal.meal_name}</h1>
                        <br></br>
                        <form>
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
                                    <select class="form-control" id="Tipo" onChange={event => setTipo(event.target.value)}>
                                        <option selected={carnivoro} value="C">Normal</option>
                                        <option selected={vegetariano} value="V">Vegetariano</option>
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
                   
                        <div className="row">
                            <div >
                                <Button 
                                    onClick={() => {
                                        const confirmacion = window.confirm('¿Seguro que quieres guardar estos cambios?')
                                        if(confirmacion){
                                            patchMeal(id, nombre, imagen, descrp, tipo, costo, proteinas, calorias, carbohi, grasas);
                                            nav('/meals')
                                        }
                                }} style={{width: 150, height: 50, marginTop: 22, float: 'right'}}>
                                    Registrar
                                </Button>
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
            </StyledForm>
            </StyledFormWrapper>
        </main>
    )
}

export default ModifyMeal;

/*
<div className="col" style={{backgroundColor: 'gray'}}>
                        <div className="container">
                            <TableIngredientsSelect titleTable='Ingredientes'/>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <button 
                                    onClick={() => {
                                        const confirmacion = window.confirm('PUTISIMO')
                                        if(confirmacion){
                                            navigate('/meals')
                                        }
                                }} style={{width: 150, height:80}}>
                                    Registrar
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    */