// import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner'
import './index.css';
import React, { useState } from 'react';

const Currency = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/currency?amount=${amount}`);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-card">
      <h2>Currency Converter</h2>
      <div className="converter-container">
        <div className="converter-input">
          <label htmlFor="amount-input">Amount in INR:</label>
          <div className="input-group">
            <span className="currency-symbol">₹</span>
            <input
              id="amount-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="amount-input"
              disabled={loading}
            />
          </div>
          <button 
            onClick={handleConvert} 
            disabled={loading}
            className="convert-button"
          >
            {loading ? (
              <TailSpin color="#ffffff" height={20} width={20} />
            ) : (
              'Convert Currency'
            )}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="conversion-result">
            <h3>Converted Amounts</h3>
            <div className="result-grid">
              <div className="result-item">
                <span className="currency-label">Indian Rupee</span>
                <span className="amount">₹{result.INR.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="currency-label">US Dollar</span>
                <span className="amount">${result.USD}</span>
              </div>
              <div className="result-item">
                <span className="currency-label">Euro</span>
                <span className="amount">€{result.EUR}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Currency;