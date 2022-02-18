import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context as SelectedIng } from "../context/SelectedIngContext";
import TableIngredientsSelect from "./TableIngredientsSelect";


const Recipe = () => {
    const params = useParams();
    const id = params.id;
    const nombrePlatillo = params.nombre;
    const { state, reset} = useContext(SelectedIng);
    const [pasos, setPasos] = useState("");
    let i;

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
                                                i = state.map(a => a.id);
                                                alert(pasos+ '\r' + i)
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