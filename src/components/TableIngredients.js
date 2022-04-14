import DataTable, { createTheme } from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context as IngredientContext } from "../context/IngredientContext";
import { TextField } from "../styles/TextField";
import { Button } from "../styles/Button";

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
    <Button type="button" onClick={onClear} className='btn btn-dark'>
      Limpiar
    </Button>
    <Link to={addNewRoute} ><Button type="button" >{addNewText}</Button></Link>
  </>
);


export default function Table({titleTable, addNewRoute, addNewText}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const { state: ingredients, fetchIngredients, deleteIngredient } = useContext(IngredientContext);
    const contextmsg = { singular: 'ingrediente', plural: 'ingredientes', message: 'seleccionado(s)' }
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
            cell: (row) => <Button 
                    onClick={() => nav('/modify-ingredient/'+row.ingredient_id)}
                    className='btn btn-dark'
                >
                    Modificar
                </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];   
    
    useEffect(() => {
        fetchIngredients();
    }, []);

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
            <Button type="button" onClick={fetchIngredients} className='btn btn-dark'>
              Refrescar
            </Button>
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
        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
          Eliminar
        </Button>
      );
	}, [ingredients, selectedRows, toggleCleared]);

  createTheme('smartfeed', {
    text: {
      primary: '#4a3503',
      secondary: '#4a3503',
    },
    background: {
      default: 'white',
    },
    context: {
      background: '#ecffeb',
      text: '#232423',
      //position: 'absolute',
      marginBottom: 50
    },
    divider: {
      default: '#e5e5e5',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
    striped: {
        default: '#ecffeb',
    },
  });

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
              theme="smartfeed"
              noDataComponent={"No hay ingredientes"}
              contextMessage={contextmsg}
          />
        </div>
    );
}
