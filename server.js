const express = require('express');
const app = express();
const IP = 'localhost';
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

//API Content-Switch index.html
app.get('/api/views/:ContentID', (req, res) => {
    const viewName = req.params.ContentID;
    res.render(viewName, {}, (err, html) => {
        if (err){
            return res.status(500).send('RenderERROR: api/views/:')
        }
        res.send(html);
    })
});

app.post('/api/test', (req, res) => {
    const input = req.body;
    if (!input) {
        return res.status(400).json({
            status: 'error',
            message: 'Fehlende Daten im req.body'
        });
    }
    console.log('Daten empfangen:', input);
    const output = {info:'Erster API-POST Aufruf erfolgreich!'};
    res.status(201).json({
        status: 'success',
        message: 'Daten übermittelt.',
        data: output,
    });
});

app.get('/', (req, res) => {
    res.send(`✓ Server is running... Watch this Site http://${IP}:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`✓ Server is running on http://${IP}:${PORT}`);
});