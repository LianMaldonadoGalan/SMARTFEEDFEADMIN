import React from "react";
import Table from './Table';
import { useNavigate } from "react-router-dom";

const Ingredients = () => {
    let nav = useNavigate()

    const columns = [
        {
          name: "Nombre",
          selector: (row) => row.title
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
      
      const data = [
        {
            id: 1,
            title: "Huevo",
        },
        {
            id: 2,
            title: "Sal",
        },
        {
            id: 3,
            title: 'Pimienta'
        },
        {
            id: 4,
            title: "Carne de res",
        },
        {
            id: 5,
            title: "etc",
        },
        {
            id: 6,
            title: 'Busca'
        },
        {
            id: 7,
            title: "Rick",
        },
        {
            id: 8,
            title: "Luis",
        },
        {
            id: 9,
            title: 'Lian'
        },
        {
            id: 10,
            title: "Huevesito",
        },
        {
            id: 11,
            title: "Mantequilla",
        },
        {
            id: 12,
            title: 'Test'
        }
    ];
    
    return (
        <Table 
            titleTable='Ingredientes' 
            data={data} 
            columns={columns}
            addNewRoute='/add-ingredients'
            addNewText='Añadir ingrediente'
        />
    );
};

export default Ingredients;