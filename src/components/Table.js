import DataTable from "react-data-table-component";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import differenceBy from 'lodash/differenceBy';


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

export default function Table({titleTable, data, columns, addNewRoute, addNewText}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );
    const [toggleCleared, setToggleCleared] = React.useState(false);
  	const [tableData, setTabledata] = React.useState(data);


    const filteredItems = tableData.filter(
        (item) =>
        item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
    );

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
                onClear={handleClear}
                filterText={filterText}
                addNewRoute={addNewRoute}
                addNewText={addNewText}
            />  
        );
    }, [filterText, resetPaginationToggle]);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				setTabledata(differenceBy(tableData, selectedRows, 'title'));
			}
		};

		return (
			<butto key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</butto>
		);
	}, [data, selectedRows, toggleCleared]);

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
