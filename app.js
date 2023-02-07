const express = require('express');
const app = express();
const fs = require('fs/promises');

app.use(express.json());

app.get('/api/owners/:id', (req, res) => {
    const {id} = req.params;
    
    fs.readFile(`${__dirname}/data/owners/${id}.json`)
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

app.get('/api/owners/:id/pets', (req, res) =>{
    const { id } = req.params
    fs.readdir(`${__dirname}/data/pets`)
    .then((filesOfPets) => {
        const promisesToReadPets = [];

        filesOfPets.forEach((fileOfPets) => {
            promisesToReadPets.push( fs.readFile(`${__dirname}/data/Pets/${fileOfPets}`) );
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then((resultsOfReadingFiles) => {
        const pets = [];

        resultsOfReadingFiles.forEach((pet) => pets.push( JSON.parse(pet) ));

        const ownerPet = pets.filter(pet =>{
            return pet.owner === id
        })
        
        res.status(200).send({ pets : ownerPet });
    });

})

app.get('/api/pets', (req, res) =>{
    const { temperament } = req.query;
    fs.readdir(`${__dirname}/data/pets`)
    .then((filesOfPets) => {
        const promisesToReadPets = [];

        filesOfPets.forEach((fileOfPets) => {
            promisesToReadPets.push( fs.readFile(`${__dirname}/data/Pets/${fileOfPets}`) );
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then((resultsOfReadingFiles) => {
        const pets = [];

        resultsOfReadingFiles.forEach((pet) => pets.push( JSON.parse(pet) ));

        const queryPet = pets.filter(pet =>{
            return pet.temperament === temperament
        })
        
        res.status(200).send({ pets : queryPet });
    });

});

app.get('/api/pets/:id', (req, res) => {
    const {id} = req.params;
    
    fs.readFile(`${__dirname}/data/pets/${id}.json`)
    .then((pets) => {
        const parsedpets = JSON.parse(pets);
        
        res.status(200).send({ pets: parsedpets });
    });
});


app.patch('/api/owners/:id', (req, res) => {
    const {id} = req.params;
    
    fs.readFile(`${__dirname}/data/owners/${id}.json`)
    .then((owner) => {
        const parsedOwner = JSON.parse(owner);
        const { name, age } = req.body
        parsedOwner.name = name
        parsedOwner.age = age
        
        res.status(200).send({ owner: parsedOwner });
    });
});

module.exports = app;
