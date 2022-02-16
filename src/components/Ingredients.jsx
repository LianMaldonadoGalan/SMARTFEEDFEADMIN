import React from "react";
import Table from './TableIngredients';

const Ingredients = () => { 
    
    return (
        <>
           
            <Table 
                titleTable='Ingredientes' 
                addNewRoute='/add-ingredients'
                addNewText='Añadir ingrediente'
            />
        </>
        
    );
};

export default Ingredients;