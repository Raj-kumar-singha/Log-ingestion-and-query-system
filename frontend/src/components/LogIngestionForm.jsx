import React, { useState } from 'react';
import { postLog } from '../services/api';

export default function LogIngestionForm({ onLogAdded }) {
  const [formData, setFormData] = useState({
    level: 'info',
    message: '',
    resourceId: '',
    timestamp: new Date().toISOString().slice(0, 16),
    traceId: '',
    spanId: '',
    commit: '',
    parentResourceId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const logData = {
        ...formData,
        timestamp: new Date(formData.timestamp).toISOString(),
        metadata: {
          parentResourceId: formData.parentResourceId
        }
      };
      delete logData.parentResourceId;

      await postLog(logData);
      setSuccess('✅ Log ingested successfully!');
      setFormData({
        level: 'info',
        message: '',
        resourceId: '',
        timestamp: new Date().toISOString().slice(0, 16),
        traceId: '',
        spanId: '',
        commit: '',
        parentResourceId: ''
      });
      if (onLogAdded) onLogAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to ingest log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ingestion-form">
      <div className="form-header">
        <h3 className="form-title">
          📝 Ingest New Log
        </h3>
        <p className="form-subtitle">
          Add a new log entry to the system
        </p>
      </div>

      {error && (
        <div className="form-error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {success && (
        <div className="form-success">
          <span className="success-icon">✅</span>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-grid">
          {/* Level */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📊</span>
              Log Level *
            </label>
            <select 
              name="level" 
              value={formData.level} 
              onChange={handleChange} 
              required
              className="form-select"
            >
              <option value="error">ERROR</option>
              <option value="warn">WARN</option>
              <option value="info">INFO</option>
              <option value="debug">DEBUG</option>
            </select>
          </div>

          {/* Resource ID */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🆔</span>
              Resource ID *
            </label>
            <input
              type="text"
              name="resourceId"
              value={formData.resourceId}
              onChange={handleChange}
              placeholder="e.g., server-1234"
              required
              className="form-input"
            />
          </div>

          {/* Message */}
          <div className="form-group full-width">
            <label className="form-label">
              <span className="label-icon">💬</span>
              Message *
            </label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter log message..."
              required
              className="form-input"
            />
          </div>

          {/* Timestamp */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🕒</span>
              Timestamp *
            </label>
            <input
              type="datetime-local"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Trace ID */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔗</span>
              Trace ID *
            </label>
            <input
              type="text"
              name="traceId"
              value={formData.traceId}
              onChange={handleChange}
              placeholder="e.g., abc-xyz-123"
              required
              className="form-input"
            />
          </div>

          {/* Span ID */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📎</span>
              Span ID *
            </label>
            <input
              type="text"
              name="spanId"
              value={formData.spanId}
              onChange={handleChange}
              placeholder="e.g., span-456"
              required
              className="form-input"
            />
          </div>

          {/* Commit */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">💾</span>
              Commit Hash *
            </label>
            <input
              type="text"
              name="commit"
              value={formData.commit}
              onChange={handleChange}
              placeholder="e.g., 5e5342f"
              required
              className="form-input"
            />
          </div>

          {/* Parent Resource ID */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏗️</span>
              Parent Resource ID *
            </label>
            <input
              type="text"
              name="parentResourceId"
              value={formData.parentResourceId}
              onChange={handleChange}
              placeholder="e.g., server-5678"
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner-small"></span>
                Ingesting...
              </>
            ) : (
              '📤 Ingest Log'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 