const express = require('express');
const app = express();
const fs = require('fs/promises');

app.get('/api/owners/:id', (req, res) => {
    const {id} = req.params;
    
    fs.readFile(`${__dirname}/data/owners/o${id}.json`)
    .then((owner) => {
        const parsedOwner = JSON.parse(owner);
        
        res.status(200).send({ owner: parsedOwner });
    });
});

module.exports = app;
