const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
})

app.listen(port, () => {
    console.log('You have entered the realm of development on port: ' + port);
});