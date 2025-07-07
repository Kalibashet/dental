const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Store submitted appointments in memory
let appointments = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission from index.html
app.post('/submit', (req, res) => {
    const { fullName, email, phone, date, service, notes } = req.body;

    // Store essential appointment info
    appointments.push({
        fullName,
        date,
        service
    });

    // Redirect to the staff dashboard page
    res.redirect('/staff.html');
});

// API to fetch appointments data
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
