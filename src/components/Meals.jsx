import React from "react";
import Table from './TableMeals';

const Meals = () => {

    return (
        <Table 
            titleTable='Platillos' 
            addNewRoute='/add-meal'
            addNewText='Añadir platillo'
        />
    );
};

export default Meals;