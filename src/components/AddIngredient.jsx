import React from "react";
import { useNavigate } from "react-router-dom";

const AddIngredient = () => {
    let navigate = useNavigate();

    return(
        <main>
            <div className="container-fluid">
                <div className="row" style={{ margin: 50, backgroundColor: 'red'}}>
                    <div className="col">
                        <h1>Ingredientes</h1>
                        <form>
                            <div className="form-group row">
                                <label for="Nombre:" className="col-sm-3 col-form-label">Nombre:</label>
                                <div className="col">
                                    <input type={Text} class="form-control" id="Nombre"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Foto 1:" className="col-sm-3 col-form-label">Foto 1:</label>
                                <div className="col">
                                    <input type={Text} class="form-control" id="Descripcion" rows={5}/>
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
                        </form>
                    </div>
                    <div className="col" style={{backgroundColor: 'blue'}}>
                        <button onClick={() => {
                            const confirmacion = window.confirm('PUTISIMO')
                            if(confirmacion){
                                navigate('/ingredients')
                            }
                        }}>Registrar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddIngredient;