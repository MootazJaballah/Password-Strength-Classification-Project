const express = require('express');
const { connectToServer } = require('./database/db');
const Routes = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.use('/', Routes);

connectToServer((err) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});