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

app.get('/api/owners', (req, res) => {
    fs.readdir(`${__dirname}/data/owners`)
    .then((filesOfOwners) => {
        const promisesToReadOwners = [];

        filesOfOwners.forEach((fileOfOwner) => {
            promisesToReadOwners.push( fs.readFile(`${__dirname}/data/owners/${fileOfOwner}`) );
        });
        
        return Promise.all(promisesToReadOwners);
    })
    .then((resultsOfReadingFiles) => {
        const owners = [];

        resultsOfReadingFiles.forEach((owner) => owners.push( JSON.parse(owner) ));
        
        res.status(200).send({ owners });
    });
});

module.exports = app;
