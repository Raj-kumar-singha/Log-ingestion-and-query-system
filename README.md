# Log Ingestion and Querying System

A full-stack application for ingesting, persisting, and querying logs with a modern React frontend and Node.js/Express backend.

## 🚀 Features

### Backend (Node.js/Express)
- **POST /logs** - Ingest new logs with comprehensive schema validation
- **GET /logs** - Query logs with multiple filters (AND logic)
- **JSON File Persistence** - No database required, logs stored in `logs.json`
- **Schema Validation** - Strict validation for all required fields
- **Error Handling** - Comprehensive error responses and logging
- **Health Check** - `/health` endpoint for monitoring

### Frontend (React)
- **Modern UI/UX** - Beautiful, responsive design with gradients and animations
- **Real-time Filtering** - Debounced search with instant results
- **Log Ingestion Form** - User-friendly form for adding new logs
- **Color-coded Log Levels** - Visual distinction between error, warn, info, debug
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Loading States** - Smooth loading indicators and transitions

## 📋 Requirements Met

✅ **Backend Requirements:**
- Node.js/Express server
- JSON file persistence (no database)
- POST /logs endpoint with schema validation
- GET /logs endpoint with comprehensive filtering
- All required fields: level, message, resourceId, timestamp, traceId, spanId, commit, metadata.parentResourceId
- Reverse-chronological sorting
- AND logic for multiple filters

✅ **Frontend Requirements:**
- React application with modern UI
- Filter bar with all filter inputs
- Log viewer with color-coded levels
- Debounced search functionality
- Loading spinner and error handling
- Clear filters button
- Responsive design

## 🛠️ Technology Stack

- **Backend:** Node.js, Express, CORS, Body-parser
- **Frontend:** React, Vite, CSS3 with modern animations
- **Persistence:** JSON file storage
- **Validation:** Custom schema validation
- **Styling:** Modern CSS with gradients, shadows, and responsive design

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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