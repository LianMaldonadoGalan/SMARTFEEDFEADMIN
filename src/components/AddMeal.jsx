import React from "react"
import TableIngredientsSelect from './TableIngredientsSelect'
import { useNavigate } from "react-router-dom"

const AddMeal = () => {
    let navigate = useNavigate();
    
    return(
        <main>
            <div className="container-fluid">
                <div className="row" style={{ margin: 50, backgroundColor: 'aqua'}}>
                    <div className="col">
                        <h1>Platillos</h1>
                        <form>
                            <div className="form-group row">
                                <label for="Nombre:" className="col-sm-3 col-form-label">Nombre</label>
                                <div className="col">
                                    <input type={Text} class="form-control" id="Nombre"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Descripción:" className="col-sm-3 col-form-label">Descripción</label>
                                <div className="col">
                                    <textarea class="form-control" id="Descripcion" rows={5}/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Tipo:" className="col-sm-3 col-form-label">Tipo</label>
                                <div className="col">
                                    <select class="form-control" id="Tipo">
                                        <option>Normal</option>
                                        <option>Vegetariano</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Costo" className="col-sm-3 col-form-label">Costo</label>
                                <div className="col">
                                    <input type="number" class="form-control" id="Costo"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Proteinas" className="col-sm-3 col-form-label">Proteinas</label>
                                <div className="col">
                                    <input type="number" class="form-control" id="Proteinas"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Calorias"className="col-sm-3 col-form-label">Calorias</label>
                                <div className="col">
                                    <input type="number" class="form-control" id="Calorias"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Carbohidratos" className="col-sm-3 col-form-label">Carbohidratos</label>
                                <div className="col">
                                    <input type="number" class="form-control" id="Carbohidratos"/>
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <label for="Grasas" className="col-sm-3 col-form-label">Grasas</label>
                                <div className="col">
                                    <input type="number" class="form-control" id="Grasas"/>
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
                        </form>
                    </div>
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
                </div>
            </div>
        </main>
    )
}

export default AddMeal;