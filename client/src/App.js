/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ColorPicker from './components/ColorPicker';
import Button from './components/Button';
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  const minRows = 1;
  const minCols = 1;
  const maxRows = 90;
  const maxCols = 90;
  const initialGridSize = 5;
  const initialColors = ['#DF3030', '#068968', '#29B3AA'];

  const [grid, setGrid] = useState([]);
  const [numRows, setNumRows] = useState(initialGridSize);
  const [numCols, setNumCols] = useState(initialGridSize);
  const [colors, setColors] = useState(initialColors);
  const [showGrid, setShowGrid] = useState(false);
  const [floodFillColor, setFloodFillColor] = useState('');

  // Update the grid when colors are changed
  useEffect(() => {
    if (showGrid) {
      initializeGrid();
    }
  }, [colors, showGrid]);

  // Initialize the grid with random colors
  const initializeGrid = () => {
    const newGrid = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        row.push(randomColor);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  // Handle color selection
  const handleColorSelect = (index, color) => {
    const updatedColors = [...colors];
    updatedColors[index] = color;
    setColors(updatedColors);
  };

  // Handle change in the number of rows
  const handleNumRowsChange = (e) => {
    setNumRows(parseInt(e.target.value));
  };

  // Handle change in the number of columns
  const handleNumColsChange = (e) => {
    setNumCols(parseInt(e.target.value));
  };

  // Generate the grid with selected colors
  const handleGenerateClick = () => {
    if (numRows < minRows || numRows > maxRows || numCols < minCols || numCols > maxCols) {
      alert(`Please enter values between ${minRows}-${maxRows} for rows and ${minCols}-${maxCols} for columns.`);
      return;
    }
    initializeGrid();
    setShowGrid(true);
  };

  // Handle change in flood fill color
  const handleFloodFillColorChange = (e) => {
    setFloodFillColor(e.target.value);
  };

  // Handle cell click event
  const handleCellClick = (rowIndex, colIndex) => {
    performFloodFill(rowIndex, colIndex, floodFillColor);
  };

  // Perform the flood fill operation
  const performFloodFill = (x, y, floodFillColor) => {
    if (floodFillColor && x !== -1 && y !== -1) {
      // Sending API call to backend server to perform the flood fill algorithm
      axios.post(`${API_BASE_URL}/api/flood-fill`, {
        grid,
        x,
        y,
        floodFillColor,
      })
      .then((response) => {
        setGrid(response.data);
      })
      .catch((error) => {
        console.error('Error performing flood fill:', error);
      });
    }
  };

  return (
    <div>
      <Header />
      <InputPanel 
        numRows={numRows}
        numCols={numCols}
        minRows={minRows}
        minCols={minCols}
        maxRows={maxRows}
        maxCols={maxCols}
        handleNumRowsChange={handleNumRowsChange}
        handleNumColsChange={handleNumColsChange}
      />
      <ColorPicker 
        colors={colors}
        handleColorSelect={handleColorSelect}
      />
      <Button handleGenerateClick={handleGenerateClick} />
      { showGrid && <Grid 
        floodFillColor={floodFillColor}
        handleFloodFillColorChange={handleFloodFillColorChange}
        grid={grid}
        handleCellClick={handleCellClick}
      /> }
      <Footer />
    </div>
  );
}

export default App;