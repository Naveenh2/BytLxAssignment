import React, { useState } from 'react';
import Weather from './components/Weather';
import Currency from './components/Currency';
import Quotes from './components/Quotes';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  return (
    <div className="App">
      <header className="App-header">
        <h1>InfoHub</h1>
      </header>

      <div className="tab-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'weather' ? 'active' : ''}
            onClick={() => setActiveTab('weather')}
          >
            Weather
          </button>
          <button
            className={activeTab === 'currency' ? 'active' : ''}
            onClick={() => setActiveTab('currency')}
          >
            Currency
          </button>
          <button
            className={activeTab === 'quotes' ? 'active' : ''}
            onClick={() => setActiveTab('quotes')}
          >
            Quotes
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'weather' && <Weather />}
          {activeTab === 'currency' && <Currency />}
          {activeTab === 'quotes' && <Quotes />}
        </div>
      </div>
    </div>
  );
}

export default App;
