import React from 'react';

const levelColors = {
  error: '#ffebee',
  warn: '#fff8e1',
  info: '#e3f2fd',
  debug: '#f5f5f5',
};

const levelTextColors = {
  error: '#d32f2f',
  warn: '#f57c00',
  info: '#1976d2',
  debug: '#616161',
};

const levelIcons = {
  error: '🔴',
  warn: '🟡',
  info: '🔵',
  debug: '⚪',
};

export default function LogViewer({ logs }) {
  const formatTimestamp = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="log-viewer">
      <div className="viewer-content">
        {logs.length > 0 ? (
          <div className="logs-table-container">
            <table className="logs-table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Timestamp</th>
                  <th className="table-header-cell">Level</th>
                  <th className="table-header-cell">Message</th>
                  <th className="table-header-cell">Resource ID</th>
                  <th className="table-header-cell">Trace ID</th>
                  <th className="table-header-cell">Span ID</th>
                  <th className="table-header-cell">Commit</th>
                  <th className="table-header-cell">Parent Resource</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {logs.map((log, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell timestamp-cell">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="table-cell level-cell">
                      <span 
                        className={`level-badge level-${log.level}`}
                        title={log.level.toUpperCase()}
                      >
                        {levelIcons[log.level]} {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="table-cell message-cell">
                      <div className="message-content">
                        {log.message}
                      </div>
                    </td>
                    <td className="table-cell resource-cell">
                      <code className="code-text">{log.resourceId}</code>
                    </td>
                    <td className="table-cell trace-cell">
                      <code className="code-text">{log.traceId}</code>
                    </td>
                    <td className="table-cell span-cell">
                      <code className="code-text">{log.spanId}</code>
                    </td>
                    <td className="table-cell commit-cell">
                      <code className="code-text">{log.commit}</code>
                    </td>
                    <td className="table-cell parent-cell">
                      <code className="code-text">{log.metadata?.parentResourceId}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">No logs found</h3>
            <p className="empty-message">
              Try adjusting your filters or add a new log to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 