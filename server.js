const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
// Parses incoming requests with urlencoded and json payloads
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serves static files from the 'public' directory
app.use(express.static("public"));

// Routes
// Use HTML routes defined in the 'html-routes.js' file
app.use(htmlRoutes);
// Use API routes defined in the 'api-routes.js' file
app.use(apiRoutes);

// Global Error Handling Middleware
// Handles errors globally and sends a generic error response
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
