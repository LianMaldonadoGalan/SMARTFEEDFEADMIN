import React, { useState } from "react";
import Table from './TableIngredients';
import { useNavigate } from "react-router-dom";

const Ingredients = () => {
    let nav = useNavigate()

    const columns = [
        {
            name: "Id",
            selector: (row) => row.ingredient_id
          },
        {
          name: "Nombre",
          selector: (row) => row.ingredient_name
        },
        {		
            cell: () => <button 
                    onClick={() => nav('/modify-ingredient')}
                    className='btn btn-dark'
                >
                    Modificar
                </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];    
    
    return (
        <>
           
            <Table 
                titleTable='Ingredientes' 
                columns={columns}
                addNewRoute='/add-ingredients'
                addNewText='Añadir ingrediente'
            />
        </>
        
    );
};

export default Ingredients;