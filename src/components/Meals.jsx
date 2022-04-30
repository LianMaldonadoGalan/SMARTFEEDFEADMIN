import React, { useContext, useEffect } from "react";
import Table from './TableMeals';
import { Context as MealContext } from "../context/MealContext";
import { Context as SelectedIntegredients } from "../context/SelectedIngContext";


const Meals = () => {
    const { fetchMeals } = useContext(MealContext);
    const { reset } = useContext(SelectedIntegredients);
  

    useEffect(() => {
        reset();
        fetchMeals();
    }, []);

  

    return (
        <div>
        <Table 
            titleTable='Platillos'
            addNewRoute='/add-meal'
            addNewText='Añadir platillo'
        />
        </div>
    );
};

export default Meals;