const Button = ({ handleGenerateClick }) => {
  return (
    <div>
        <button className="btn-outline" onClick={handleGenerateClick}>Generate</button>
        <p><small>Clicking on the Generate button will generate a default 5x5 grid along with pre-set colors.
        <br />Please select the colors along with the number of rows and columns to generate a custom grid.</small></p>
    </div>
  )
}

export default Button;