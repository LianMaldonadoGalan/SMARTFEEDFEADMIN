import DataTable, { createTheme } from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context as MealContext } from "../context/MealContext";
import { Context as RecipeContext } from "../context/RecipeContext";
import { Context as IngredientContext} from '../context/IngredientContext'
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
        <Button type="button" onClick={onClear} >Limpiar </Button>
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

    const { state: meals, fetchMeals, deleteMeal } = useContext(MealContext);
    const { getRecipe } = useContext(RecipeContext);
    const { fetchIngredients } = useContext(IngredientContext);
    let nav = useNavigate()
    const contextmsg = { singular: 'platillo', plural: 'platillos', message: 'seleccionado(s)' }
    
    useEffect(() => {
        fetchMeals();
    }, []);
    
    const columns = [
        {
            name: "Id",
            selector: (row) => row.id_meal,
            width: "75px"
        },
        {
            name: "Nombre",
            selector: (row) => row.meal_name,
            width: "150px",
            wrap: true
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
            cell: (row) => <Button 
                    onClick={() => nav('/modify-meal/'+row.id_meal)}
                    className='btn btn-dark'
                >
                    Modificar
                </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {		
            cell: (row) => <Button 
                    onClick={async() => {
                        await getRecipe(row.id_meal);
                        await fetchIngredients();
                        nav('/recipe/'+row.id_meal+'/'+row.meal_name)
                    }}
                    className='btn btn-dark'
                >
                    Ver receta
                </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const filteredItems = meals.filter(
        (item) =>
        item.meal_name && item.meal_name.toLowerCase().includes(filterText.toLowerCase())
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
                <Button type="button" onClick={fetchMeals}  >
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
        
        if (window.confirm(`¿Estas seguro que deseas eliminar:\r ${selectedRows.map(r => r.meal_name)}?`)) {
          setToggleCleared(!toggleCleared);
          selectedRows.forEach(m => {
            deleteMeal(m.id_meal);
          })
        }
      };

      return (
        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
          Borrar
        </Button>
      );
	}, [meals, selectedRows, toggleCleared]);

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
                noDataComponent={"No hay platillos"}
                contextMessage = {contextmsg}
            />
        </div>
    );
}

