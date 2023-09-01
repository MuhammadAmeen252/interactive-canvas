/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Resizable } from 'react-resizable';
import { BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart, BarController, LineController, PieController } from 'chart.js';
import TableComponent from './TableComponent';
import CardOptions from './CardOptions'; // Import the CardOptions component



Chart.register(BarController, LineController, PieController, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


Chart.register(
  BarController, LineController, PieController,
  BarElement, LineElement, PointElement, 
  CategoryScale, LinearScale, 
  Title, Tooltip, Legend
);

const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Sample Data',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1
    }]
  };
  
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const Card = ({ id, title, position, onDragStart, onDragStop, onDelete, onDuplicate, zIndex }) => {
    const [showCardOptions, setShowCardOptions] = useState(false);
    const [showSqlHelp, setShowSqlHelp] = useState(false);

    const cardRef = useRef(null);
    const [resizing, setResizing] = useState(false);
    const [chartType, setChartType] = useState('bar');
  
    const [sqlQuery, setSqlQuery] = useState("");
    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 400;
    const chartContainerRef = useRef(null); // Reference to the chart container
  
    const [dimensions, setDimensions] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });
    
    const [xAxisLabel, setXAxisLabel] = useState('Default X Label');
    const [yAxisLabel, setYAxisLabel] = useState('Default Y Label');
  
    const chartRef = useRef(null); // Reference to the chart container
    const [textBoxHeight, setTextBoxHeight] = useState(100);
    const resizingTextBoxRef = useRef(false);
    function handleAxisChange(axis, value) {
      if (axis === 'x') {
        setXAxisLabel(value);
      } else if (axis === 'y') {
        setYAxisLabel(value);
      }
    }

    const [xAxisKey, setXAxisKey] = useState(''); // Add this line
    const [yAxisKey, setYAxisKey] = useState(''); // Add this line
    const [selectedXAxis, setSelectedXAxis] = useState('');
    const [selectedYAxis, setSelectedYAxis] = useState('');

    const handleXAxisChange = (e) => {
      const selectedKey = e.target.value;
    
      // Check that the selectedKey exists in the first item of your data
      if (data.length > 0 && selectedKey in data[0]) {
        setXAxisKey(selectedKey);
    
        // Set the label for the X axis based on the selected key
        setXAxisLabel(`${selectedKey}`);
    
        // Update the chart data based on the selected key
        const newChartData = {
          labels: data.map(item => item[selectedKey]), // Set labels based on the selected key
          datasets: chartData.datasets, // Keep the datasets unchanged or update as needed
        };
        setSelectedXAxis(selectedKey);
        setChartData(newChartData);
      } else {
        // Handle the case where the selectedKey doesn't exist in your data
        console.error(`The selected key ${selectedKey} doesn't exist in the data`);
      }
    };

    const handleYAxisChange = (e) => {
      const selectedKey = e.target.value;
      setYAxisKey(selectedKey);
    
      // Set the label for the Y axis based on the selected key
      setYAxisLabel(`${selectedKey}`);
    
      // Update the chart data based on the selected key
      const newChartData = {
        labels: chartData.labels,
        datasets: chartData.datasets.map((dataset) => ({
          ...dataset,
          data: data.map(item => item[selectedKey]), // Assuming data is an array of objects
        })),
      };
      setSelectedYAxis(selectedKey);
      setChartData(newChartData);
    };

  
    const setMinimumHeight = () => {
      if (cardRef.current) {
        const titleHeight = 20; // You can adjust this based on your title's height
        const buttonsHeight = cardRef.current.querySelector('div > button')?.offsetHeight || 0;
        const textBoxHeight = cardRef.current.querySelector('textarea')?.offsetHeight || 0;
        const chartHeight = chartContainerRef.current?.offsetHeight || 0;
  
        // Padding, add your desired padding (top and bottom)
        const padding = 40;
  
        const totalHeight = titleHeight + buttonsHeight + textBoxHeight + chartHeight + padding;
  
        setDimensions(prev => ({
          ...prev,
          height: Math.max(prev.height, totalHeight)
        }));
      }
    };
  
    const [chartData, setChartData] = useState({
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }]
    });
  
    const fetchDummyData = () => {
      setTimeout(() => {
        const fetchedData = {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
            label: 'Fetched Data',
            data: [5, 15, 10, 8, 12],
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }]
        };
        setChartData(fetchedData);
      }, 1000);
    };
  
    const renderChart = () => {
        const chartOptions = {
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: xAxisLabel
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yAxisLabel
              }
            }
          }
        };
        switch (chartType) {
          case 'bar':
            return <Bar data={chartData} options={chartOptions} />;
          case 'line':
            return <Line data={chartData} options={chartOptions} />;
          case 'pie':
            return <Pie data={chartData} options={chartOptions} />;
          default:
            return null;
        }
      };

      
  
    const handleTextBoxResizeMouseDown = (e) => {
      e.stopPropagation();
      const initialY = e.clientY;
  
      const onMouseMove = (event) => {
        const newHeight = textBoxHeight + (event.clientY - initialY);
        setTextBoxHeight(Math.max(newHeight, 50)); // Minimum height of 50 pixels
        setMinimumHeight(); // Update the card's minimum height
      };
  
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  
    const handleCardMouseDown = (e) => {
      e.stopPropagation();
      setResizing(true);
    };
  
    const data = [
      { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
      // Add more data objects as needed
    ];

  
    const handleCardMouseMove = (e) => {
      if (resizing && !resizingTextBoxRef.current) { // If resizing the card, not the text box
        const newWidth = dimensions.width + e.movementX;
        const newHeight = dimensions.height + e.movementY;
  
        setDimensions({
          width: Math.max(newWidth, MIN_WIDTH),
          height: Math.max(newHeight, MIN_HEIGHT)
        });
      }
    };
  
    useEffect(() => {
      setMinimumHeight();
      const handleResize = () => {
        setMinimumHeight();
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [chartType, chartData]); // Recalculate whenever the chart type or data changes
  
    const handleMouseUp = () => {
      setResizing(false);
    };
  
    useEffect(() => {
      document.addEventListener('mousemove', handleCardMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleCardMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [resizing, dimensions]);

    const cardOptionsRef = useRef(null); // Reference to the card options container

    const handleClickOutside = (event) => {
        if (cardOptionsRef.current && !cardOptionsRef.current.contains(event.target)) {
          setShowCardOptions(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        function handleClickOutside(event) {
        if (cardOptionsRef.current && !cardOptionsRef.current.contains(event.target)) {
            setShowCardOptions(false);
            setShowSqlHelp(false);
        }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    
  
    return (
        <Draggable
          position={position}
          onStart={() => onDragStart(id)}
          onStop={(e, data) => onDragStop(id, data)}
        >
          <div
            ref={cardRef}
            data-card-id={id}
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              backgroundColor: 'lightgray',
              position: 'absolute',
              cursor: 'move',
              padding: '20px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              zIndex: zIndex, // Using the zIndex prop here
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>{title}</div>
            <div>
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onDuplicate(id)}>Duplicate</button>
                <button onClick={() => setShowCardOptions(!showCardOptions)}>Options</button>
                <button onClick={() => setShowSqlHelp(!showSqlHelp)}>Help</button>
            </div>
            </div>
            <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                style={{
                  width: '100%',
                  height: `${textBoxHeight}px`,
                  margin: '0',
                  fontFamily: 'monospace',
                  overflowY: 'auto',
                  resize: 'none'
                }}
              />
              <div
                onMouseDown={handleTextBoxResizeMouseDown}
                style={{
                  width: '100%',
                  height: '6px',
                  cursor: 'ns-resize',
                  background: 'grey'
                }}
              ></div>
            </div>
            <button onClick={fetchDummyData}>Run Query</button>
            <div ref={chartContainerRef} style={{ width: '100%', height: '250px', flex: 1 }}>
              <div style={{ width: '100%', height: '100%' }}>{renderChart()}</div>
            </div>
            <div
              onMouseDown={handleCardMouseDown}
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'black',
                position: 'absolute',
                bottom: 0,
                right: 0,
                cursor: 'nwse-resize'
              }}
            ></div>
            <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%', overflow: 'hidden' }}> {/* Setting overflow to 'hidden' */}
              <TableComponent data={data} />
            </div>
            <div ref={cardOptionsRef}>
            {showCardOptions ? (
                <CardOptions
                showOptions={showCardOptions}
                onChartTypeChange={setChartType}
                onAxisChange={handleAxisChange}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
                data={data}
                selectedXAxis={selectedXAxis}
                selectedYAxis={selectedYAxis}
                handleXAxisChange={handleXAxisChange}
                handleYAxisChange={handleYAxisChange}
              />             
            ) : showSqlHelp ? (
                <div style={{ border: '1px solid #000', padding: '10px', position: 'absolute', left: '100%', top: 0 }}>
                <h3>SQL Query Help</h3>
                <pre>Explanation about the SQL query...</pre>
                </div>
            ) : null}
            </div>
          </div>
        </Draggable>
      );
    };

export default Card;