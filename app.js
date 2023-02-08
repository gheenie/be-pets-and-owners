const express = require('express');
const fs = require('fs/promises');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

app.get('/api/owners/:ownerId', controllers.getOwner);

app.get('/api/owners', controllers.getAllOwners);

app.get('/api/owners/:ownerId/pets', controllers.getOwnerPets);

app.get('/api/pets', controllers.getQueriedPets);

app.get('/api/pets/:petId', controllers.getPet);

app.patch('/api/owners/:ownerId', controllers.updateOwner);

app.post('/api/owners', controllers.addOwner);

// Refactor to use catch?
app.post('/api/owners/:id/pets', (req, res) => {
    fs.readdir(`${__dirname}/data/owners`)
    .then(filesOfOwners => {
        const promisesToReadOwners = filesOfOwners.map(fileOfOwner => {
            return fs.readFile(`${__dirname}/data/owners/${fileOfOwner}`);
        });
        
        return Promise.all(promisesToReadOwners);
    })
    .then(readOwners => {
        const ownerIds = readOwners.map(readOwner => JSON.parse(readOwner).id);
        
        const pet = req.body;
        
        if ( ownerIds.includes(pet.owner) ) {
            const petId = `p${Date.now()}`;
            // Only a shallow copy.
            const addingPet = { petId, ...pet };

            fs.writeFile(`${__dirname}/data/pets/${petId}.json`, JSON.stringify(addingPet))
            .then(() => {
                res.status(201).send({ pet: addingPet });
            });
        } else {
            res.status(404).send({ msg: 'Owner not found.' })
        }
    });
});

app.delete('/api/pets/:petId', (req, res) => {
    const { petId } = req.params;
    
    fs.unlink(`${__dirname}/data/pets/${petId}.json`)
    .then(() => {
        res.status(200).send({ msg : 'Pet successfully deleted' });
    })
    .catch(err => {
        console.log(err);

        res.status(404).send({ msg : 'Pet does not exist' });
    });
});

app.delete('/api/owners/:ownerId', (req, res) => {
    const { ownerId } = req.params;
    
    fs.unlink(`${__dirname}/data/owners/${ownerId}.json`)
    .then(() =>{
        return fs.readdir(`${__dirname}/data/pets`);
    })
    .then(filesOfPets => {
        const promisesToReadPets = filesOfPets.map(fileOfPet => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPet}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then(readPets => {
        const ownerPetIds = readPets.map(readPet => JSON.parse(readPet))
        .filter(pet => pet.owner === ownerId)
        .map(ownerPet => ownerPet.id);

        const promisesToDeletePets = ownerPetIds.map(ownerPetId => {
            return fs.unlink(`${__dirname}/data/pets/${ownerPetId}.json`);
        });

        return Promise.all(promisesToDeletePets);
    })
    .then(() => {
        res.status(200).send({ msg : 'Owner and her pets successfully deleted' });
    })
    .catch(err => {
        console.log(err);

        res.status(404).send({ msg : 'Owner does not exist' })
    });
});

module.exports = app;
