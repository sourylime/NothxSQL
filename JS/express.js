
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection.js');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use('/api', routes);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

connection.on('error', (error) => {
    console.error('Error connecting to MongoDB', error);
});

