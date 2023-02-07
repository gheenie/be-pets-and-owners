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
        const promisesToReadOwners = filesOfOwners.map((fileOfOwner) => {
            return fs.readFile(`${__dirname}/data/owners/${fileOfOwner}`);
        });
        
        return Promise.all(promisesToReadOwners);
    })
    .then((resultsOfReadingFiles) => {
        const owners = resultsOfReadingFiles.map((owner) => JSON.parse(owner));
        
        res.status(200).send({ owners });
    });
});

app.get('/api/owners/:id/pets', (req, res) =>{
    const { id } = req.params

    fs.readdir(`${__dirname}/data/pets`)
    .then((filesOfPets) => {
        const promisesToReadPets = filesOfPets.map((fileOfPets) => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPets}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then((resultsOfReadingFiles) => {
        const pets = resultsOfReadingFiles.map((pet) => JSON.parse(pet));

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
        const promisesToReadPets = filesOfPets.map((fileOfPets) => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPets}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then((resultsOfReadingFiles) => {
        const pets = resultsOfReadingFiles.map((pet) => JSON.parse(pet));

        // if else no parameters?
        //if (temperament === undefined) res.status(200).send({ pets });

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
        
        res.status(202).send({ owner: parsedOwner });
    });
});

app.post('/api/owners', (req, res) => {
    const owner = req.body;
    const id = `o${Date.now()}`;
    // Only a shallow copy.
    const addingOwner = { id, ...owner };

    fs.writeFile(`${__dirname}/data/owners/${id}.json`, JSON.stringify(addingOwner))
    .then(() => {
        res.status(202).send({ owner: addingOwner });
    });
});

app.delete('/api/pets/:id', (req, res) => {
    const {id} = req.params;
    
    fs.unlink(`${__dirname}/data/pets/${id}.json`)
    .then(() => {
        res.status(202).send({ msg : 'Pet successfully deleted' });
    })
    .catch((err) => res.status(404).send({msg : 'Pet does not exist'}))
});

app.delete('/api/owners/:id', (req, res) => {
    const {id} = req.params;
    
    fs.unlink(`${__dirname}/data/owners/${id}.json`)
    .then(() =>{
        return fs.readdir(`${__dirname}/data/pets`)
    })
    .then((filesOfPets) => {
        const promisesToReadPets = filesOfPets.map((fileOfPets) => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPets}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then((resultsOfReadingFiles) => {
        const ownedPetsIds = resultsOfReadingFiles.map((pet) =>{
            return JSON.parse(pet);
        }).filter(pet =>{
            return pet.owner === id
        }).map(pet =>{
            return pet.id
        })

        const promisesToDeletePets = ownedPetsIds.map(ownedPetsId =>{
            return fs.unlink(`${__dirname}/data/pets/${ownedPetsId}.json`)
        })
        return Promise.all(promisesToDeletePets)
    })
    .then(() => {
        res.status(202).send({ msg : 'Owner successfully deleted' });
    })
    .catch((err) => res.status(404).send({msg : 'Owner does not exist'}))

});




module.exports = app;
