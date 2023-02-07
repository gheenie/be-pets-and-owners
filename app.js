const express = require('express');
const fs = require('fs/promises');

const app = express();
app.use(express.json());

app.get('/api/owners/:ownerId', (req, res) => {
    const { ownerId } = req.params;
    
    fs.readFile(`${__dirname}/data/owners/${ownerId}.json`)
    .then(owner => {
        const parsedOwner = JSON.parse(owner);
        
        res.status(200).send({ owner: parsedOwner });
    });
});

app.get('/api/owners', (req, res) => {
    fs.readdir(`${__dirname}/data/owners`)
    .then(filesOfOwners => {
        const promisesToReadOwners = filesOfOwners.map(fileOfOwner => {
            return fs.readFile(`${__dirname}/data/owners/${fileOfOwner}`);
        });
        
        return Promise.all(promisesToReadOwners);
    })
    .then(readOwners => {
        const owners = readOwners.map(readOwner => JSON.parse(readOwner));
        
        res.status(200).send({ owners });
    });
});

app.get('/api/owners/:ownerId/pets', (req, res) =>{
    const { ownerId } = req.params

    fs.readdir(`${__dirname}/data/pets`)
    .then(filesOfPets => {
        const promisesToReadPets = filesOfPets.map(fileOfPet => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPet}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then(readPets => {
        const pets = readPets.map(readPet => JSON.parse(readPet));
        
        const ownerPets = pets.filter(pet => pet.owner === ownerId);
        
        res.status(200).send({ pets : ownerPets });
    });
});

app.get('/api/pets', (req, res) =>{
    const { temperament } = req.query;

    fs.readdir(`${__dirname}/data/pets`)
    .then(filesOfPets => {
        const promisesToReadPets = filesOfPets.map(fileOfPet => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPet}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then(readPets => {
        const pets = readPets.map(readPet => JSON.parse(readPet));

        //if (temperament !== undefined) ?
        const queriedPets = pets.filter(pet => pet.temperament === temperament);
        
        res.status(200).send({ pets : queriedPets });

        //default logic?
    });
});

app.get('/api/pets/:petId', (req, res) => {
    const { petId } = req.params;
    
    fs.readFile(`${__dirname}/data/pets/${petId}.json`)
    .then(pet => {
        const parsedPet = JSON.parse(pet);
        
        res.status(200).send({ pet: parsedPet });
    });
});

app.patch('/api/owners/:ownerId', (req, res) => {
    const { ownerId } = req.params;
    
    fs.readFile(`${__dirname}/data/owners/${ownerId}.json`)
    .then(readOwner => {
        const owner = JSON.parse(readOwner);
        const { name, age } = req.body

        owner.name = name
        owner.age = age
        
        // Update actual file?

        res.status(200).send({ owner });
    });
});

app.post('/api/owners', (req, res) => {
    const owner = req.body;
    const ownerId = `o${Date.now()}`;
    // Only a shallow copy.
    const addingOwner = { ownerId, ...owner };

    fs.writeFile(`${__dirname}/data/owners/${ownerId}.json`, JSON.stringify(addingOwner))
    .then(() => {
        res.status(201).send({ owner: addingOwner });
    });
});

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

// Use petId in url or /api/pets with body provided by client?
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

// Use ownerId in url or /api/owners with body provided by client?
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
            return fs.unlink(`${__dirname}/data/pets/${ownerPetId}.json`)
        });

        return Promise.all(promisesToDeletePets);
    })
    .then(() => {
        res.status(200).send({ msg : 'Owner successfully deleted' });
    })
    .catch(err => {
        console.log(err);

        res.status(404).send({msg : 'Owner does not exist'})
    });
});




module.exports = app;
