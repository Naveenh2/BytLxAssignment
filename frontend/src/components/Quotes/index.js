import React, { useState, useEffect } from 'react';
import './index.css'
const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial quote when component mounts
  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="quotes-card">
      <h2>Daily Inspiration</h2>
      <div className="quotes-container">
        {quote && !loading && (
          <div className="quote-content">
            <div className="quote-icon">❝</div>
            <p className="quote-text">{quote.quote}</p>
            <p className="quote-author">― {quote.author}</p>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <button 
          onClick={getNewQuote} 
          disabled={loading}
          className="quote-button"
        >
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            'Get New Quote'
          )}
        </button>
      </div>
    </div>
  );
};

export default Quotes;