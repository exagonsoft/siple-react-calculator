import React, { useState } from 'react';
import './App.css';

const btnValues = [
  [7, 8, 9, 'DEL'],
  [4, 5, 6, '+'],
  [1, 2, 3, '-'],
  ['.', 0, '/', 'x'],
  ['RESET', '='],
];

const App = () => {
  const [result, setResult] = useState('0');

  const handleClick = (e) => {
    const value = e.target.getAttribute('value');

    switch (value) {
      case 'DEL':
        setResult((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
        break;

      case 'RESET':
        setResult('0');
        break;

      case '=':
        try {
          // Replace 'x' with '*' for multiplication
          const expression = result.replace(/x/g, '*');
          // Evaluate the expression safely
          setResult(eval(expression).toString()); // Be cautious: eval has security implications
        } catch {
          setResult('Error');
        }
        break;

      default:
        setResult((prev) => (prev === '0' ? value : prev + value));
        break;
    }
  };

  return (
    <div className='wrapper'>
      <div className='cal_title'>
        <span>Simple React Calculator</span>
      </div>
      <div className='cal_result mt-10'>
        <span>{result}</span>
      </div>
      <div className='cal_pad mt-10'>
        {btnValues.flat().map((item, i) => (
          <button
            className={`cal_btn ${item === 'DEL' || item === 'RESET' ? 'del' : ''} ${item === '=' ? 'eq' : ''}`}
            value={item}
            key={i}
            onClick={handleClick}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
