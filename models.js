const fs = require('fs/promises');

const fetchOwner = ownerId => {
    return fs.readFile(`${__dirname}/data/owners/${ownerId}.json`)
    .then(owner => {
        return JSON.parse(owner);
    });
};

const fetchAllOwners = () => {
    return fs.readdir(`${__dirname}/data/owners`)
    .then(filesOfOwners => {
        const promisesToReadOwners = filesOfOwners.map(fileOfOwner => {
            return fs.readFile(`${__dirname}/data/owners/${fileOfOwner}`);
        });
        
        return Promise.all(promisesToReadOwners);
    })
    .then(readOwners => {
        return readOwners.map(readOwner => JSON.parse(readOwner));
    });
};

const fetchOwnerPets = () => {
    return fs.readdir(`${__dirname}/data/pets`)
    .then(filesOfPets => {
        const promisesToReadPets = filesOfPets.map(fileOfPet => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPet}`);
        });
        
        return Promise.all(promisesToReadPets);
    })
    .then(readPets => {
        return readPets.map(readPet => JSON.parse(readPet));
    });
};

const fetchAllPets = temperament => {
    return fs.readdir(`${__dirname}/data/pets`)
    .then(filesOfPets => {
        const promisesToReadPets = filesOfPets.map(fileOfPet => {
            return fs.readFile(`${__dirname}/data/pets/${fileOfPet}`)
            .then(readPet => JSON.parse(readPet));
        });
        
        return Promise.all(promisesToReadPets);
    });
};

const fetchPet = petId => {
    return fs.readFile(`${__dirname}/data/pets/${petId}.json`)
    .then(pet => {
        return JSON.parse(pet);
    });
};

const createOwner = (ownerId, addingOwner) => {
    return fs.writeFile(`${__dirname}/data/owners/${ownerId}.json`, JSON.stringify(addingOwner));
};

module.exports = {
    fetchOwner,
    fetchAllOwners,
    fetchOwnerPets,
    fetchAllPets,
    fetchPet,
    createOwner
}
