import React, { useContext, useEffect } from "react";
import Table from './TableIngredients';
import { Context as IngredientsContext } from "../context/IngredientContext";

const Ingredients = () => { 
    const { fetchIngredients } = useContext(IngredientsContext);

    useEffect(() => {
        fetchIngredients();
    }, []);
    
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