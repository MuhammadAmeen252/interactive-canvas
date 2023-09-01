/* eslint-disable */
import React, { useState, useRef } from 'react';
import 'react-resizable/css/styles.css';
import Card from './CardComponent';
import MenuComponent from './MenuComponent'; // Import the MenuComponent

function App() {
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const [cards, setCards] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [topZIndex, setTopZIndex] = useState(1);

  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const viewRef = useRef(null);

  const [canvases, setCanvases] = useState([{ name: 'Default Canvas', cards: [] }]);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

  const addCanvas = () => {
    setCanvases([...canvases, { name: `Canvas ${canvases.length + 1}`, cards: [] }]);
  };

  const deleteCanvas = (index) => {
    if (canvases.length > 1) {
      const newCanvases = [...canvases];
      newCanvases.splice(index, 1);
      setCanvases(newCanvases);
      if (index === currentCanvasIndex) {
        setCurrentCanvasIndex(0);
      }
    } else {
      alert("You can't delete the last canvas.");
    }
  };

  const renameCanvas = (index, newName) => {
    const newCanvases = [...canvases];
    newCanvases[index].name = newName;
    setCanvases(newCanvases);
  };

  const getNonOverlappingPosition = (position) => {
    let newPosition = { ...position };
    let overlapFound;
  
    do {
      overlapFound = false;
  
      for (const card of cards) {
        if (
          card.position.x === newPosition.x &&
          card.position.y === newPosition.y
        ) {
          newPosition.x += 10; // Offset to the right by 10 pixels
          newPosition.y += 10; // Offset down by 10 pixels
          overlapFound = true; // Continue to check for other overlaps
          break;
        }
      }
    } while (overlapFound); // Keep looping until no overlaps are found
  
    return newPosition;
  };
  

  const handleMouseDown = (e) => {
    setIsPanning(true);
    viewRef.current.style.cursor = 'grabbing';
  };

  // Function to handle when the user moves the mouse
  const handleMouseMove = (e) => {
    if (isPanning && !isDraggingCard) {
      const newViewPosition = {
        x: viewPosition.x + e.movementX,
        y: viewPosition.y + e.movementY,
      };
      setViewPosition(newViewPosition);
    }
  };

  // Function to handle when the user stops dragging
  const handleMouseUp = () => {
    setIsPanning(false);
    viewRef.current.style.cursor = 'grab';
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 5)); // Maximum zoom of 5
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.1)); // Minimum zoom of 0.1


  const handleWheel = (e) => {
    // Zoom in/out using the mouse wheel
    //setZoom((prevZoom) => prevZoom - e.deltaY * 0.001);
    setZoom((prevZoom) => Math.max(prevZoom - e.deltaY * 0.001, 0.1)); // Minimum zoom of 0.1
  };


  const bringToFront = () => {
    const newZIndex = topZIndex + 1;
    setTopZIndex(newZIndex);
    return newZIndex;
  };

  const handleDragStop = (id, data) => {
    setIsDraggingCard(false);
    const newZIndex = bringToFront();
    const newPosition = getNonOverlappingPosition({ x: data.x, y: data.y });
  
    // Update cards state
    const newCards = cards.map(card =>
      card.id === id ? { ...card, position: newPosition, zIndex: newZIndex } : card
    );
    setCards(newCards);
  
    // Update canvases state
    const newCanvases = [...canvases];
    const canvasCards = newCanvases[currentCanvasIndex].cards.map(card =>
      card.id === id ? { ...card, position: newPosition, zIndex: newZIndex } : card
    );
    newCanvases[currentCanvasIndex].cards = canvasCards;
    setCanvases(newCanvases);
  };

  const handleDragStart = (id) => {
    setIsDraggingCard(true);
    const newZIndex = bringToFront();
    const newCards = cards.map(card =>
      card.id === id ? { ...card, zIndex: newZIndex } : card
    );
    setCards(newCards);
  };
  

  const addCard = (title) => {
    const newCanvases = [...canvases];
    const position = getNonOverlappingPosition({ x: 0, y: 0 });
    const newCard = {
      id: cards.length + 1,
      position,
      zIndex: cards.length + 1,
      title,
    };
    setCards([...cards, newCard]);
    newCanvases[currentCanvasIndex].cards.push(newCard);
    setCanvases(newCanvases);
  };

  const deleteCard = (id) => {
    const newCards = cards.filter(card => card.id !== id);
    setCards(newCards);
  };

  const duplicateCard = (id) => {
    const cardToDuplicate = cards.find(card => card.id === id);
    const newPosition = getNonOverlappingPosition(cardToDuplicate.position);
    const newZIndex = bringToFront(); // Get the next top zIndex value
    const newCard = {
      ...cardToDuplicate,
      id: cards.length + 1,
      zIndex: newZIndex, // Assign the new zIndex to ensure the card is on top
      position: newPosition,
    };
    setCards([...cards, newCard]);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <MenuComponent
        addCard={addCard}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        canvases={canvases}
        currentCanvasIndex={currentCanvasIndex}
        addCanvas={addCanvas}
        deleteCanvas={deleteCanvas}
        renameCanvas={renameCanvas}
        setCurrentCanvasIndex={setCurrentCanvasIndex}
      />
      <div
        ref={viewRef}
        style={{
          transform: `translate(${viewPosition.x}px, ${viewPosition.y}px) scale(${zoom})`,
          width: '100%',
          height: 'calc(100vh - 40px)',
        }}
      >
        {canvases[currentCanvasIndex].cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            position={card.position}
            onDragStart={handleDragStart}
            onDelete={deleteCard}
            onDragStop={handleDragStop}
            onDuplicate={duplicateCard}
            zIndex={card.zIndex}
            title={card.title} // Pass the title here
          />
        ))}
      </div>
    </div>
  );
}

export default App;