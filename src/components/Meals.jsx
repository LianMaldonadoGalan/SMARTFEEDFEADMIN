import React, { useEffect, useState } from "react";
import Table from './Table';
import { useNavigate } from "react-router-dom";
import smartFeed from '../api/smartFeed'
import axios from "axios";

const Meals = () => {
    let nav = useNavigate()

    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.title
        },
        {
            name: "Descripción",
            selector: (row) => row.description
        },
        {
            name: "Tipo",
            selector: (row) => row.tipo
        },
        {
            name: "Costo",
            selector: (row) => row.costo
        },
        {
            name: "Proteínas",
            selector: (row) => row.proteinas
        },
        {
            name: "Calorias",
            selector: (row) => row.calorias
        },
        {
            name: "Carbohidratos",
            selector: (row) => row.carbohidratos
        },
        {
            name: "Grasas",
            selector: (row) => row.grasas
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
    const [data, setData] = useState([]);

    const getData = () => {
        try {
            fetch('0.0.0.0:3001/health')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        } catch (error) {
            alert(error);
        }
    }

   /* useEffect(() => {
        getData();
    }, []);
    */
    return (
        <>
        <button onClick={getData}>hgjhoj</button>
        <Table 
            titleTable='Platillos' 
            data={data} 
            columns={columns}
            addNewRoute='/add-meal'
            addNewText='Añadir platillo'
        />
        </>
        

        
    );
};

export default Meals;