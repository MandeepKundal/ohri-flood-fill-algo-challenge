const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
// Enabling CORS for specific origins only (to avoid CORS Policy error)
let corsOptions = {
    origin : ['http://localhost:3000'],
}

app.use(cors(corsOptions));

// Function to implement the flood fill algorithm
function floodFill(grid, x, y, floodFillColor) {
    const originalColor = grid[x][y];

    if (originalColor === floodFillColor) {
        return grid;
    }

    const numRows = grid.length;
    const numCols = grid[0].length;

    function adjacentFill(row, col) {
        if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col] !== originalColor) {
            return;
        }

        grid[row][col] = floodFillColor;

        adjacentFill(row - 1, col); // Top Cell
        adjacentFill(row + 1, col); // Bottom Cell
        adjacentFill(row, col - 1); // Left Cell
        adjacentFill(row, col + 1); // Right Cell
        adjacentFill(row - 1, col - 1); // Top-left Cell
        adjacentFill(row - 1, col + 1); // Top-right Cell
        adjacentFill(row + 1, col - 1); // Bottom-left Cell
        adjacentFill(row + 1, col + 1); // Bottom-right Cell
    }

    adjacentFill(x, y);

    return grid;
}

// Route for the flood fill algorithm
app.post('/api/flood-fill', (req, res) => {
    const { grid, x, y, floodFillColor } = req.body;

    // Perform flood fill
    const updatedGrid = floodFill(grid, x, y, floodFillColor);

    res.json(updatedGrid);
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});