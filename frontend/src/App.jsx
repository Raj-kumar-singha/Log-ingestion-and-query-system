import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import LogViewer from './components/LogViewer';
import LogIngestionForm from './components/LogIngestionForm';
import { fetchLogs } from './services/api';
import './App.css';

function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showIngestionForm, setShowIngestionForm] = useState(false);

  const loadLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchLogs(filters);
      setLogs(data);
    } catch (err) {
      setError('Failed to load logs. Please check your connection and try again.');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      loadLogs();
    }
    return () => { ignore = true; };
  }, [filters]);

  const handleLogAdded = () => {
    loadLogs(); // Refresh logs after adding a new one
    setShowIngestionForm(false); // Hide form after successful ingestion
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            📊 Log Ingestion and Querying System
          </h1>
          <p className="app-subtitle">
            Full-stack application for ingesting, persisting, and querying logs
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="content-wrapper">
          {/* Action Bar */}
          <div className="action-bar">
            <button 
              className={`action-button ${showIngestionForm ? 'active' : ''}`}
              onClick={() => setShowIngestionForm(!showIngestionForm)}
            >
              {showIngestionForm ? '✕ Hide Form' : '➕ Add New Log'}
            </button>
            <div className="stats">
              <span className="stat-item">
                📈 Total Logs: {logs.length}
              </span>
              {loading && (
                <span className="stat-item loading">
                  ⏳ Loading...
                </span>
              )}
            </div>
          </div>

          {/* Log Ingestion Form */}
          {showIngestionForm && (
            <div className="form-section">
              <LogIngestionForm onLogAdded={handleLogAdded} />
            </div>
          )}

          {/* Filter Section */}
          <div className="filter-section">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Results Section */}
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">
                📋 Log Results 
                {logs.length > 0 && (
                  <span className="results-count">({logs.length})</span>
                )}
              </h2>
              {logs.length > 0 && (
                <div className="results-info">
                  Showing {logs.length} log{logs.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading logs...</p>
              </div>
            ) : (
              <LogViewer logs={logs} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
