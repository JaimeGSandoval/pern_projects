require('dotenv/config');
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json('Bankai'));

const port = process.env.PORT;
app.listen(port, () => console.log(`I'm listening on port ${port}...`));
