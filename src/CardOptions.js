function CardOptions({
  showOptions, onChartTypeChange, onAxisChange,
  xAxisLabel, yAxisLabel, data,
  handleXAxisChange, handleYAxisChange, selectedXAxis, selectedYAxis
}) {

  return (
    showOptions ? (
      <div style={{ border: '1px solid #000', padding: '10px', position: 'absolute', left: '100%', top: 0 }}>
        <h3>Chart Options</h3>
        <div>
          <button onClick={() => onChartTypeChange('bar')}>Bar</button>
          <button onClick={() => onChartTypeChange('line')}>Line</button>
          <button onClick={() => onChartTypeChange('pie')}>Pie</button>
        </div>
        <div>
          <label>X Axis:</label>
          <select value={selectedXAxis} onChange={handleXAxisChange}>
            {Object.keys(data[0]).map((key) => (
              <option value={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Y Axis:</label>
          <select value={selectedYAxis} onChange={handleYAxisChange}>
            {Object.keys(data[0]).map((key) => (
              <option value={key}>{key}</option>
            ))}
          </select>
        </div>
        <p>Dummy option 1</p>
        <p>Dummy option 2</p>
        <h3>SQL Query</h3>
        <pre>SELECT * FROM table_name;</pre>
      </div>
    ) : null
  );
}

export default CardOptions;