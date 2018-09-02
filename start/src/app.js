let express = require('express');
var path = require('path');
let guitars = require('./guitar-data');

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static('./public'));
app.use(express.urlencoded());

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

module.exports = {
    express: app,
    start() {
        const port = 8000;
        app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
    }
};

