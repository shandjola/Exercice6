const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware pour journaliser les requêtes
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('access.log', logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the help.html file
app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'help.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




