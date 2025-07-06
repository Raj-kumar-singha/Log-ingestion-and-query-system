# Log Ingestion and Querying System

A full-stack application for ingesting, persisting, and querying logs with a modern React frontend and Node.js/Express backend.


### Backend Setup
```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:4000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 API Documentation

### POST /logs
Ingest a new log entry.

**Request Body:**
```json
{
  "level": "info",
  "message": "User login successful",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T10:30:00.000Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}
```

**Response:**
```json
{
  "message": "Log ingested successfully",
  "logId": 42
}
```

### GET /logs
Query logs with filters.

**Query Parameters:**
- `level` - Filter by log level (error, warn, info, debug)
- `message` - Search in log messages (case-insensitive)
- `resourceId` - Filter by resource ID
- `timestamp_start` - Start timestamp (ISO 8601)
- `timestamp_end` - End timestamp (ISO 8601)
- `traceId` - Filter by trace ID
- `spanId` - Filter by span ID
- `commit` - Filter by commit hash

**Example:**
```
GET /logs?level=error&message=database&timestamp_start=2023-09-01T00:00:00Z
```

**Response:**
```json
[
  {
    "level": "error",
    "message": "Database connection failed",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T10:30:00.000Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-5678"
    }
  }
]
```

### GET /health
Health check endpoint.

## 📊 Log Schema

### Required Fields
```json
{
  "level": "string (error|warn|info|debug)",
  "message": "string (searchable text)",
  "resourceId": "string (origin of the log)",
  "timestamp": "string (ISO 8601 format)",
  "traceId": "string",
  "spanId": "string",
  "commit": "string",
  "metadata": {
    "parentResourceId": "string"
  }
}
``