import DataTable, { createTheme } from "react-data-table-component";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context as SelectedIng } from "../context/SelectedIngContext";
import { Context as IngredientsContext } from "../context/IngredientContext";

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
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por nombre"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" onClick={onClear}>
      Borrar
    </button>
  </>
);
//() => window.alert(data.map(t => t.title))
const columns = [
    {
      name: "Nombre",
      selector: (row) => row.ingredient_name
    }
];

export default function TableIngredientsSelect({titleTable, deReceta}) {
    //const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );
    const { state, putIngredients, fetchSelectedIng } = useContext(SelectedIng);
    const { state: stateIngredients } = useContext(IngredientsContext);

    const filteredItems = stateIngredients.filter(
        (item) => 
        item.ingredient_name && item.ingredient_name.toLowerCase().includes(filterText.toLowerCase())
    );
    const contextmsg = { singular: 'ingrediente', plural: 'ingredientes', message: 'seleccionado(s)' }

    useEffect(() => {
        fetchSelectedIng();
    }, []);

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

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
        }
        };

        return (    
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={fetchSelectedIng}
                filterText={filterText}
            />  
        );
    }, [filterText, resetPaginationToggle]);

    const handleChange = ({ selectedRows }) => {
        console.log(typeof selectedRows)
        putIngredients(selectedRows);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className="col">
                    <DataTable
                        title={titleTable}
                        columns={columns}
                        data={filteredItems}
                        selectableRows
                        selectableRowSelected={deReceta}
                        onSelectedRowsChange={handleChange}
                        selectableRowsNoSelectAll
                        striped
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        dense
                        fixedHeader
                        fixedHeaderScrollHeight="200px"
                        selectableRowsHighlight
                        pointerOnHover
                        noTableHead
                        highlightOnHover
                        theme={"smartfeed"}
                        noDataComponent={"No hay ingredientes"}
                        contextMessage={contextmsg}
                    />
                <DataTable
                        title='Ingredientes seleccionados'
                        columns={columns}
                        data={state}
                        striped
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        dense
                        fixedHeader
                        fixedHeaderScrollHeight="200px"
                        selectableRowsHighlight
                        pointerOnHover
                        noTableHead
                        disabled 
                        theme={"smartfeed"}
                        noDataComponent={"No hay ingredientes"}
                        contextMessage={contextmsg}
                    />
                </div>
            </div>
        </div>
    );
}
