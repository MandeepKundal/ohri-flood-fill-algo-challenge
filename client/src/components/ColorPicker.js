const ColorPicker = ({ colors, handleColorSelect }) => {
    return (
        <div>
            <label>Choose colors for the grid: </label>
            {colors.map((color, index) => (
                <input
                    key={index}
                    type="color"
                    value={color}
                    onChange={(e) => handleColorSelect(index, e.target.value)}
                />
            ))}
        </div>
    );
};

export default ColorPicker;