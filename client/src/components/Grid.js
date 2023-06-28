const Grid = ({ floodFillColor, handleFloodFillColorChange, grid, handleCellClick }) => {
    return (
        <div>
            <table className="grid">
                <tbody>
                    {grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((color, colIndex) => (
                        <td
                            key={colIndex}
                            className={`pixel ${color}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)} // Handle cell click event
                            style={{ backgroundColor: color }} // Set background color
                        ></td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <label>Flood Fill Color: </label>
            <input type="color" value={floodFillColor} 
                onChange={handleFloodFillColorChange}
            />
            <p><small>Select a color and click on a cell within the grid to perform flood fill</small></p>
        </div>
    );
};

export default Grid;