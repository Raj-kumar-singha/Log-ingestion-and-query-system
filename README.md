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

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-09-15T10:30:00.000Z",
  "totalLogs": 150,
  "server": "Log Ingestion and Querying System"
}
```

## 🎨 UI/UX Features

### Modern Design
- **Gradient Headers** - Beautiful purple gradient header
- **Card-based Layout** - Clean, organized sections
- **Smooth Animations** - Hover effects and transitions
- **Color-coded Logs** - Visual distinction for different log levels
- **Responsive Grid** - Adaptive layouts for all screen sizes

### User Experience
- **Debounced Search** - Instant filtering without performance issues
- **Loading States** - Smooth loading indicators
- **Error Handling** - Clear error messages with icons
- **Success Feedback** - Confirmation messages for actions
- **Active Filter Display** - Visual indication of applied filters

### Accessibility
- **Keyboard Navigation** - Full keyboard support
- **Focus States** - Clear focus indicators
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **High Contrast** - Readable color combinations

## 📱 Responsive Design

The application is fully responsive and works perfectly on:
- **Desktop** (1200px+) - Full feature set with optimal layout
- **Tablet** (768px-1199px) - Adapted grid layouts
- **Mobile** (320px-767px) - Single-column layout with touch-friendly controls

## 🔍 Filtering Capabilities

### Available Filters
1. **Message Search** - Full-text search in log messages
2. **Log Level** - Filter by error, warn, info, debug
3. **Resource ID** - Filter by specific resource
4. **Trace ID** - Filter by trace identifier
5. **Span ID** - Filter by span identifier
6. **Commit Hash** - Filter by git commit
7. **Date Range** - Filter by timestamp range

### Filter Logic
- **AND Logic** - All filters must match for a log to be included
- **Case-insensitive** - Message search ignores case
- **Real-time** - Filters apply immediately as you type
- **Combinable** - Use multiple filters simultaneously

## 🚀 Performance Features

- **Debounced Search** - Prevents excessive API calls
- **Efficient Filtering** - Client-side filtering for better UX
- **Optimized Rendering** - React optimization for large datasets
- **Lazy Loading** - Components load only when needed
- **Caching** - Browser caching for static assets

## 🛡️ Error Handling

### Backend Errors
- **Validation Errors** - Detailed field-specific error messages
- **Server Errors** - Graceful error handling with proper HTTP status codes
- **File System Errors** - Robust handling of JSON file operations

### Frontend Errors
- **Network Errors** - User-friendly error messages
- **Validation Errors** - Form validation with helpful feedback
- **Loading Errors** - Graceful fallbacks for failed requests

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
```

### Validation Rules
- All fields are required and must be non-empty strings
- Timestamp must be in ISO 8601 format
- Level must be one of: error, warn, info, debug
- Metadata must be an object with parentResourceId

## 🎯 Design Decisions

### Backend Architecture
- **JSON File Storage** - Simple, no database setup required
- **Express Framework** - Lightweight and fast
- **CORS Enabled** - Cross-origin requests supported
- **Comprehensive Validation** - Strict schema enforcement

### Frontend Architecture
- **React Hooks** - Modern state management
- **Component-based** - Reusable, maintainable components
- **CSS Modules** - Scoped styling without conflicts
- **Responsive First** - Mobile-first design approach

### UI/UX Decisions
- **Modern Gradients** - Visual appeal and brand identity
- **Color-coded Logs** - Quick visual identification
- **Smooth Animations** - Enhanced user experience
- **Accessibility First** - Inclusive design principles

## 🔧 Development

### Scripts
```bash
# Backend
npm start          # Start development server
npm run dev        # Start with nodemon (if available)

# Frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### File Structure
```
├── backend/
│   ├── server.js      # Express server
│   ├── logs.json      # Log storage
│   └── package.json   # Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app
│   └── package.json       # Dependencies
└── README.md
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables (optional)
2. Run `npm install`
3. Start with `npm start`
4. Configure reverse proxy if needed

### Frontend Deployment
1. Run `npm run build`
2. Deploy `dist` folder to any static hosting
3. Configure API endpoint in production

## 📈 Future Enhancements

- **Pagination** - Handle large log datasets
- **Export Features** - CSV/JSON export
- **Advanced Search** - Regex and complex queries
- **Real-time Updates** - WebSocket integration
- **User Authentication** - Multi-user support
- **Log Analytics** - Charts and statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Full-Stack Developer Assessment.

---

**Built with ❤️ using React, Node.js, and Express** 