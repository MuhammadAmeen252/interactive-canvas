/* eslint-disable */
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TableComponent.css'; // Importing the CSS file


const DndHeader = ({ children, index, moveColumn, handleSort }) => {
  const [, ref] = useDrag({
    type: 'COLUMN',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item) => {
      if (item.index === index) return;
      moveColumn(item.index, index);
      item.index = index;
    },
  });

  return (
    <th ref={(node) => ref(drop(node))} onClick={() => handleSort(children.toLowerCase())}>
      {children}
    </th>
  );
};

const TableComponent = ({ data }) => {
  const [searchValue, setSearchValue] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [columns, setColumns] = useState(['Name', 'Age', 'Email']);

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      const key = sortConfig.key.toLowerCase();
      const order = sortConfig.direction;
      if (a[key] < b[key]) {
        return order === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === 'ascending' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="table-container">
        <input type="text" className="search-input" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <DndHeader key={index} index={index} moveColumn={moveColumn} handleSort={handleSort}>
                  {column}
                </DndHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>{row[column.toLowerCase()]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default TableComponent;