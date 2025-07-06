const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const LOG_FILE = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Helper: Read logs from file
function readLogs() {
  if (!fs.existsSync(LOG_FILE)) return [];
  const data = fs.readFileSync(LOG_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading logs file:', error);
    return [];
  }
}

// Helper: Write logs to file
function writeLogs(logs) {
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error writing logs file:', error);
    throw new Error('Failed to persist logs');
  }
}

// Enhanced log schema validation according to PDF requirements
function validateLog(log) {
  const levels = ['error', 'warn', 'info', 'debug'];
  
  // Check if log is a valid object
  if (!log || typeof log !== 'object') {
    return { valid: false, error: 'Log must be a valid object' };
  }
  
  // Validate level
  if (!levels.includes(log.level)) {
    return { valid: false, error: 'Level must be one of: error, warn, info, debug' };
  }
  
  // Validate message (searchable text)
  if (typeof log.message !== 'string' || log.message.trim() === '') {
    return { valid: false, error: 'Message must be a non-empty string' };
  }
  
  // Validate resourceId (origin of the log)
  if (typeof log.resourceId !== 'string' || log.resourceId.trim() === '') {
    return { valid: false, error: 'ResourceId must be a non-empty string' };
  }
  
  // Validate timestamp (ISO 8601 format)
  if (!log.timestamp || typeof log.timestamp !== 'string') {
    return { valid: false, error: 'Timestamp must be a string' };
  }
  
  // More strict ISO 8601 validation
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  if (!iso8601Regex.test(log.timestamp)) {
    return { valid: false, error: 'Timestamp must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)' };
  }
  
  // Validate traceId
  if (typeof log.traceId !== 'string' || log.traceId.trim() === '') {
    return { valid: false, error: 'TraceId must be a non-empty string' };
  }
  
  // Validate spanId
  if (typeof log.spanId !== 'string' || log.spanId.trim() === '') {
    return { valid: false, error: 'SpanId must be a non-empty string' };
  }
  
  // Validate commit
  if (typeof log.commit !== 'string' || log.commit.trim() === '') {
    return { valid: false, error: 'Commit must be a non-empty string' };
  }
  
  // Validate metadata object
  if (typeof log.metadata !== 'object' || log.metadata === null) {
    return { valid: false, error: 'Metadata must be an object' };
  }
  
  // Validate parentResourceId in metadata
  if (typeof log.metadata.parentResourceId !== 'string' || log.metadata.parentResourceId.trim() === '') {
    return { valid: false, error: 'Metadata.parentResourceId must be a non-empty string' };
  }
  
  return { valid: true };
}

// POST /logs - Ingest log
app.post('/logs', (req, res) => {
  try {
    const log = req.body;
    
    // Validate log schema
    const validation = validateLog(log);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error,
        details: 'Please ensure all required fields are present and properly formatted'
      });
    }
    
    const logs = readLogs();
    logs.push(log);
    writeLogs(logs);
    
    console.log(`✅ Log ingested: ${log.level.toUpperCase()} - ${log.message}`);
    res.status(201).json({ 
      message: 'Log ingested successfully',
      logId: logs.length - 1
    });
  } catch (error) {
    console.error('❌ Error ingesting log:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// GET /logs - Query logs with comprehensive filtering
app.get('/logs', (req, res) => {
  try {
    let logs = readLogs();
    const { 
      level, 
      message, 
      resourceId, 
      timestamp_start, 
      timestamp_end, 
      traceId, 
      spanId, 
      commit 
    } = req.query;
    
    // Apply filters with AND logic (all filters must match)
    if (level) {
      logs = logs.filter(l => l.level === level);
    }
    
    if (message) {
      // Full-text search on message (case-insensitive)
      logs = logs.filter(l => 
        l.message.toLowerCase().includes(message.toLowerCase())
      );
    }
    
    if (resourceId) {
      logs = logs.filter(l => l.resourceId === resourceId);
    }
    
    if (timestamp_start) {
      logs = logs.filter(l => l.timestamp >= timestamp_start);
    }
    
    if (timestamp_end) {
      logs = logs.filter(l => l.timestamp <= timestamp_end);
    }
    
    if (traceId) {
      logs = logs.filter(l => l.traceId === traceId);
    }
    
    if (spanId) {
      logs = logs.filter(l => l.spanId === spanId);
    }
    
    if (commit) {
      logs = logs.filter(l => l.commit === commit);
    }
    
    // Sort in reverse-chronological order (newest first)
    logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    
    console.log(`📊 Query returned ${logs.length} logs`);
    res.json(logs);
  } catch (error) {
    console.error('❌ Error querying logs:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    const logs = readLogs();
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      totalLogs: logs.length,
      server: 'Log Ingestion and Querying System'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Log Ingestion and Querying System Server`);
  console.log(`📍 Running on port ${PORT}`);
  console.log(`📊 Log file: ${LOG_FILE}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /logs - Ingest new log`);
  console.log(`   GET /logs - Query logs with filters`);
  console.log(`   GET /health - Server status`);
}); 