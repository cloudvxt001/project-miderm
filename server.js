const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint for split bill calculation (optional)
app.post('/api/calculate-split', (req, res) => {
    const { totalAmount, peopleCount, tipPercentage } = req.body;
    
    const total = parseFloat(totalAmount) || 0;
    const people = parseInt(peopleCount) || 1;
    const tip = parseFloat(tipPercentage) || 0;
    
    if (total <= 0 || people <= 0) {
        return res.status(400).json({ error: 'Invalid input values' });
    }

    const tipAmount = total * (tip / 100);
    const totalWithTip = total + tipAmount;
    const amountPerPerson = totalWithTip / people;

    res.json({
        amountPerPerson: amountPerPerson.toFixed(2),
        totalWithTip: totalWithTip.toFixed(2),
        tipAmount: tipAmount.toFixed(2)
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
});