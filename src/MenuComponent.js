/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuComponent = ({
  addCard,
  zoomIn,
  zoomOut,
  canvases,
  currentCanvasIndex,
  setCurrentCanvasIndex, // Add this line
  addCanvas,
  deleteCanvas,
  renameCanvas,
}) => {
  const [title, setTitle] = useState('');

  const handleAddCard = () => {
    console.log('Title before adding card:', title);
    addCard(title);
    setTitle('');
  };
  const [newCanvasName, setNewCanvasName] = useState('');

  const handleCanvasChange = (e) => {
    setCurrentCanvasIndex(parseInt(e.target.value, 10)); // This line will now work
  };

  const handleRenameCanvas = () => {
    renameCanvas(currentCanvasIndex, newCanvasName);
    setNewCanvasName('');
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/settings"><button>Settings</button></Link>
      <select style={{ marginLeft: '10px' }} onChange={handleCanvasChange} value={currentCanvasIndex}>
        {canvases.map((canvas, index) => (
          <option key={index} value={index}>
            {canvas.name}
          </option>
        ))}
      </select>
      <button onClick={addCanvas}>Add Canvas</button>
      <input type="text" placeholder="New Canvas Name" value={newCanvasName} onChange={(e) => setNewCanvasName(e.target.value)} />
      <button onClick={handleRenameCanvas}>Rename Canvas</button>
      <button onClick={() => deleteCanvas(currentCanvasIndex)}>Delete Canvas</button>
        <select style={{ marginLeft: '10px' }}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <input type="text" placeholder="Ask your question..." value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      <div>
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

export default MenuComponent;