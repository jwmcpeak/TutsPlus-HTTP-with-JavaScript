let express = require('express');
let path = require('path');
let multer = require('multer');
let guitars = require('./guitar-data');

let upload = multer({dest: './public/uploads'});

let app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/guitars', (req, res) => {
    let queryKeys = Object.keys(req.query);
    let data = [];

    if (queryKeys.length > 0) {
        data = guitars.find(req.query);
    } else {
        data = guitars.all();
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.post('/api/guitars', (req, res) => {

    let guitar = guitars.add(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(guitar));
});

app.post('/api/guitars/upload', upload.any(), (req, res) => {

    let guitar = guitars.add(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(guitar));
});

module.exports = {
    express: app,
    start() {
        const port = 8000;
        app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
    }
};

