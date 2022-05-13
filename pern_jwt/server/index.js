require('dotenv/config');
const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/// register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// dashboard route
app.use('/dashboard', require('./routes/dashboard'));

const port = process.env.PORT;
app.listen(port, () => console.log(`I'm listening on port ${port}...`));
