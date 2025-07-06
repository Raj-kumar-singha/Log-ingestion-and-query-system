import React, { useState, useEffect } from 'react';

const levels = ['', 'error', 'warn', 'info', 'debug'];

export default function FilterBar({ filters, setFilters }) {
  const [localMessage, setLocalMessage] = useState(filters.message || '');

  // Debounce message input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(f => ({ ...f, message: localMessage }));
    }, 400);
    return () => clearTimeout(handler);
  }, [localMessage, setFilters]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const handleClear = () => {
    setFilters({});
    setLocalMessage('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3 className="filter-title">
          🔍 Filter Logs
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={handleClear}
            className="clear-filters-btn"
          >
            🗑️ Clear All Filters
          </button>
        )}
      </div>

      <div className="filter-grid">
        {/* Message Search */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🔤</span>
            Search Message
          </label>
          <input
            type="text"
            placeholder="Search in log messages..."
            value={localMessage}
            onChange={e => setLocalMessage(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Level Filter */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📊</span>
            Log Level
          </label>
          <select 
            name="level" 
            value={filters.level || ''} 
            onChange={handleChange}
            className="filter-select"
          >
            {levels.map(l => (
              <option key={l} value={l}>
                {l ? l.toUpperCase() : 'All Levels'}
              </option>
            ))}
          </select>
        </div>

        {/* Resource ID */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🆔</span>
            Resource ID
          </label>
          <input
            type="text"
            name="resourceId"
            placeholder="e.g., server-1234"
            value={filters.resourceId || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* Trace ID */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🔗</span>
            Trace ID
          </label>
          <input
            type="text"
            name="traceId"
            placeholder="e.g., abc-xyz-123"
            value={filters.traceId || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* Span ID */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📎</span>
            Span ID
          </label>
          <input
            type="text"
            name="spanId"
            placeholder="e.g., span-456"
            value={filters.spanId || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* Commit */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">💾</span>
            Commit Hash
          </label>
          <input
            type="text"
            name="commit"
            placeholder="e.g., 5e5342f"
            value={filters.commit || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* Start Date */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📅</span>
            Start Date
          </label>
          <input
            type="datetime-local"
            name="timestamp_start"
            value={filters.timestamp_start || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* End Date */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📅</span>
            End Date
          </label>
          <input
            type="datetime-local"
            name="timestamp_end"
            value={filters.timestamp_end || ''}
            onChange={handleChange}
            className="filter-input"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active Filters:</span>
          {Object.entries(filters).map(([key, value]) => {
            if (value && value !== '') {
              return (
                <span key={key} className="active-filter-tag">
                  {key}: {value}
                </span>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
} 