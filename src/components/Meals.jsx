import React, { useEffect, useState } from "react";
import Table from './TableMeals';
import { useNavigate } from "react-router-dom";
import smartFeed from '../api/smartFeed'
import axios from "axios";

const Meals = () => {
    let nav = useNavigate()

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id_meal
        },
        {
            name: "Nombre",
            selector: (row) => row.meal_name
        },
        {
            name: "Descripción",
            selector: (row) => row.meal_description
        },
        {
            name: "Tipo",
            selector: (row) => row.meal_type
        },
        {
            name: "Costo",
            selector: (row) => row.meal_cost
        },
        {
            name: "Proteínas",
            selector: (row) => row.meal_protein
        },
        {
            name: "Calorias",
            selector: (row) => row.meal_calories
        },
        {
            name: "Carbohidratos",
            selector: (row) => row.meal_carbohydrates
        },
        {
            name: "Grasas",
            selector: (row) => row.meal_fats
        },
        {		
            cell: () => <button 
                    onClick={() => nav('/modify-meal')}
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
            titleTable='Platillos' 
            columns={columns}
            addNewRoute='/add-meal'
            addNewText='Añadir platillo'
        />
        </>
        

        
    );
};

export default Meals;