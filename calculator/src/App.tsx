// src/App.tsx
import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [prevInput, setPrevInput] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (shouldReset) {
      setInput(num);
      setShouldReset(false);
    } else {
      setInput(input === '0' ? num : input + num);
    }
  };

  const handleDecimalClick = () => {
    if (shouldReset) {
      setInput('0.');
      setShouldReset(false);
      return;
    }
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator && prevInput && !shouldReset) {
      calculate();
    }
    setPrevInput(input);
    setOperator(op);
    setShouldReset(true);
  };

  const calculate = () => {
    if (!operator || !prevInput) return;
    
    const prev = parseFloat(prevInput);
    const current = parseFloat(input);
    if (isNaN(prev) || isNaN(current)) return;

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          setInput('Error');
          resetCalculator();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    
    setInput(result.toString());
    setPrevInput('');
    setOperator(null);
    setShouldReset(true);
  };

  const handleEqualsClick = () => {
    if (operator && prevInput) {
      calculate();
    }
    setShouldReset(true);
  };

  const handleClearClick = () => {
    resetCalculator();
  };

  const resetCalculator = () => {
    setInput('0');
    setPrevInput('');
    setOperator(null);
    setShouldReset(false);
  };

  const handleNegateClick = () => {
    const currentValue = parseFloat(input);
    if (!isNaN(currentValue)) {
      setInput((currentValue * -1).toString());
    }
  };

  const handlePercentClick = () => {
    const currentValue = parseFloat(input);
    if (!isNaN(currentValue)) {
      setInput((currentValue / 100).toString());
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="display-previous">
            {prevInput && operator ? `${prevInput} ${operator}` : ''}
          </div>
          <div className="display-current">{input}</div>
        </div>
        <div className="buttons">
          <button onClick={handleClearClick} className="btn btn-function">
            C
          </button>
          <button onClick={handleNegateClick} className="btn btn-function">
            +/-
          </button>
          <button onClick={handlePercentClick} className="btn btn-function">
            %
          </button>
          <button onClick={() => handleOperatorClick('/')} className="btn btn-operator">
            ÷
          </button>
          
          <button onClick={() => handleNumberClick('7')} className="btn btn-number">
            7
          </button>
          <button onClick={() => handleNumberClick('8')} className="btn btn-number">
            8
          </button>
          <button onClick={() => handleNumberClick('9')} className="btn btn-number">
            9
          </button>
          <button onClick={() => handleOperatorClick('*')} className="btn btn-operator">
            ×
          </button>
          
          <button onClick={() => handleNumberClick('4')} className="btn btn-number">
            4
          </button>
          <button onClick={() => handleNumberClick('5')} className="btn btn-number">
            5
          </button>
          <button onClick={() => handleNumberClick('6')} className="btn btn-number">
            6
          </button>
          <button onClick={() => handleOperatorClick('-')} className="btn btn-operator">
            -
          </button>
          
          <button onClick={() => handleNumberClick('1')} className="btn btn-number">
            1
          </button>
          <button onClick={() => handleNumberClick('2')} className="btn btn-number">
            2
          </button>
          <button onClick={() => handleNumberClick('3')} className="btn btn-number">
            3
          </button>
          <button onClick={() => handleOperatorClick('+')} className="btn btn-operator">
            +
          </button>
          
          <button onClick={() => handleNumberClick('0')} className="btn btn-number btn-zero">
            0
          </button>
          <button onClick={handleDecimalClick} className="btn btn-number">
            .
          </button>
          <button onClick={handleEqualsClick} className="btn btn-equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;