const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // CORS-Paket importieren
const app = express();
const port = 3000;

// CORS konfigurieren
app.use(cors({
    origin: 'https://moviestarplanet2.com'  // Nur Anfragen von dieser Domain erlauben
}));

app.use(express.json());
app.use(express.static('public'));

let tokens = [];

if (fs.existsSync('tokens.json')) {
    tokens = JSON.parse(fs.readFileSync('tokens.json'));
}

// Route zum Speichern des Tokens
app.post('/save-token', (req, res) => {
    const { jwt, expiredAt } = req.body;

    // Füge das Token und das Ablaufdatum zum Array hinzu
    tokens.push({ jwt, expiredAt });

    // Speichere die Daten in der JSON-Datei
    fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2));

    res.json({ message: 'Token gespeichert!' });
});

// Route zum Abrufen aller Tokens (filtere abgelaufene Tokens)
app.get('/alltokens', (req, res) => {
    const currentTime = new Date().getTime(); // aktuelle Zeit in Millisekunden

    // Filtere abgelaufene Tokens
    tokens = tokens.filter(token => token.expiredAt > currentTime);

    // Sende nur nicht abgelaufene Tokens zurück
    res.json(tokens);
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
