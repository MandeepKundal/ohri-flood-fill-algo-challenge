const InputPanel = ({ 
  numRows, numCols, minRows, minCols, maxRows, maxCols,
  handleNumRowsChange, handleNumColsChange
}) => {
  return(
    <div>
      <div className="rowsDiv">
        <label htmlFor="numRows">Number of Rows for the grid (1-90): </label>
        <input
          type="number"
          id="numRows"
          min={minRows}
          max={maxRows}
          value={numRows}
          onChange={handleNumRowsChange}
        />
      </div>
      <div className="colsDiv">
        <label htmlFor="numCols">Number of Columns for the grid (1-90): </label>
        <input
          type="number"
          id="numCols"
          min={minCols}
          max={maxCols}
          value={numCols}
          onChange={handleNumColsChange}
        />
      </div>
      <p><small>The numbers should be added in the range of 1 to 90 in order to keep the grid legible</small></p>
    </div>
  );
};

export default InputPanel;