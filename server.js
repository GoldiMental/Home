const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/test', (req, res) => {
    const input = req.body;
    if (!input) {
        return res.status(400).json({
            status: 'error',
            message: 'Fehlende Daten im req.body'
        });
    }
    console.log('Daten empfangen:', input);
    res.status(201).json({
        status: 'success',
        message: 'Daten übermittelt.',
        data: input,
    })
});

app.get('/', (req, res) => {
    res.send(`✓ Server is running... Watch this Site http://localhost:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
});