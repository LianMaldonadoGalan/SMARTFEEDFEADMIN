import DataTable from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context as IngredientContext } from "../context/IngredientContext";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`
const FilterComponent = ({ filterText, onFilter, onClear, addNewRoute, addNewText }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por nombre"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" onClick={onClear} className='btn btn-dark'>
      Limpiar
    </button>
    <Link to={addNewRoute} className='btn btn-dark'>{addNewText}</Link>
  </>
);

//() => window.alert(data.map(t => t.title))


export default function Table({titleTable, addNewRoute, addNewText}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const { state: ingredients, fetchIngredients, deleteIngredient } = useContext(IngredientContext);

    let nav = useNavigate()

    //Definición de columnas
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
            cell: (row) => <button 
                    onClick={() => nav('/modify-ingredient/'+row.ingredient_id)}
                    className='btn btn-dark'
                >
                    Modificar
                </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];   
    
    useEffect(() => {
        fetchIngredients();
        
    }, []);

    console.log(ingredients)

    const filteredItems = ingredients.filter(
        (item) =>
        item.ingredient_name && item.ingredient_name.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
        }
        };

        return (    
          <>
            <FilterComponent
              onFilter={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
              addNewRoute={addNewRoute}
              addNewText={addNewText}
            />  
            <button type="button" onClick={fetchIngredients} className='btn btn-dark'>
              Refrescar
            </button>
          </>
            
        );
    }, [filterText, resetPaginationToggle]);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const contextActions = React.useMemo(() => {
      const handleDelete = () => {
        
        if (window.confirm(`¿Estas seguro que deseas eliminar:\r ${selectedRows.map(r => r.ingredient_name)}?`)) {
          setToggleCleared(!toggleCleared);
          selectedRows.forEach(i => {
            deleteIngredient(i.ingredient_id);
          })
        }
      };

      return (
        <button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
          Delete
        </button>
      );
	}, [ingredients, selectedRows, toggleCleared]);

    return (
        <div>
          
            <DataTable
              title={titleTable}
              columns={columns}
              data={filteredItems}
              selectableRows
              onSelectedRowsChange={handleChange}
              selectableRowsNoSelectAll
              clearSelectedRows={toggleCleared}
              contextActions={contextActions}
              striped
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              selectableRowsHighlight
              pointerOnHover
              highlightOnHover
          />
          
        </div>
    );
}
