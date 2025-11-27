const express = require('express');
const cors = require('cors');
const app = express();
const IP = 'localhost';
const PORT = 3000;

const corsOpt = {
    origin: ['https://www.goldimental.de', 'https://goldimental.de', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOpt));

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

//API Content-Switch index.html
app.get('/api/views/:ContentID', (req, res) => {
    const viewName = req.params.ContentID;
    res.render(viewName, {}, (err, html) => {
        if (err) {
            return res.status(500).send('RenderERROR: api/views/:')
        }
        res.send(html);
    })
});


//Test-API
app.post('/api/test', (req, res) => {
    const input = req.body;
    if (!input || Object.keys(input).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Fehlende Daten im Request-Body!'
        });
    }
    const { message, id } = input;
    if (!message || typeof message !== 'string' || message.length < 5) {
        return res.status(400).json({
            status: 'error',
            message: 'ValidationError: "message" nicht gegeben oder kürzer als 5 Zeichen!',
        });
    }
    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
        return res.status(400).json({
            status: 'error',
            message: 'ValidationError: "id" nicht gegeben oder NaN!',
        });
    }
    console.log('Daten empfangen und validiert:', input);
    const output = { info: 'Erster API-POST Aufruf erfolgreich!', messageLength: message.length };
    res.status(201).json({
        status: 'success',
        message: 'Daten übermittelt und validiert!',
        data: output,
    });
});

app.get('/', (req, res) => {
    res.send(`✓ Server is running... Watch this Site http://${IP}:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`✓ Server is running on http://${IP}:${PORT}`);
});