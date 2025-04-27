const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let tokens = [];

if (fs.existsSync('tokens.json')) {
    tokens = JSON.parse(fs.readFileSync('tokens.json'));
}

app.post('/save-token', (req, res) => {
    tokens.push(req.body);
    fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2));
    res.json({ message: 'Token gespeichert!' });
});

app.get('/alltokens', (req, res) => {
    res.json(tokens);
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
