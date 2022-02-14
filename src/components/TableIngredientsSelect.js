import DataTable from "react-data-table-component";
import React, { useState } from "react";
import styled from "styled-components";


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
      selector: (row) => row.title
    }
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


export default function TableIngredientsSelect({titleTable}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
        false
    );


    const filteredItems = data.filter(
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
            />  
        );
    }, [filterText, resetPaginationToggle]);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
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
                    />
                </div>
                <div className="col">
                <DataTable
                        title='Ingredientes seleccionados'
                        columns={columns}
                        data={selectedRows}
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
                    />
                </div>
            </div>
        </div>
    );
}
