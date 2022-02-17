import React from "react";
import { useParams } from "react-router";
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