const models = require('./models');
const ld = require('lodash');

const getOwner = (req, res) => {
    const { ownerId } = req.params;
    
    models.fetchOwner(ownerId)
    .then(owner => {
        res.status(200).send({ owner });
    });
}

const getAllOwners = (req, res) => {
    models.fetchAllOwners()
    .then(owners => {
        res.status(200).send({ owners });
    });
};

const getOwnerPets = (req, res) => {
    const { ownerId } = req.params;

    models.fetchAllPets()
    .then(pets => {
        const ownerPets = ld.cloneDeep(pets);

        ownerPets = pets.filter(pet => pet.owner === ownerId);
        
        res.status(200).send({ ownerPets });
    });
};

const getQueriedPets = (req, res) => {
    const queries = req.query;

    models.fetchAllPets()
    .then(pets => {
        let queriedPets = ld.cloneDeep(pets);

        if ( !ld.isEmpty(queries) ) {
            for ( const [queryKey, queryValue] of Object.entries(queries) ) {
                queriedPets = queriedPets.filter(pet => pet[queryKey] === queryValue);
            }
        }
        
        res.status(200).send({ pets : queriedPets });
    });
};

const getPet = (req, res) => {
    const { petId } = req.params;
    
    models.fetchPet(petId)
    .then(pet => {
        res.status(200).send({ pet });
    });
};

const updateOwner = (req, res) => {
    const { ownerId } = req.params;

    fetchOwner(ownerId)
    .then(owner => {
        const { name, age } = req.body;

        owner.name = name;
        owner.age = age;
        
        // Update actual file?

        res.status(200).send({ owner });
    });
};

const addOwner = (req, res) => {
    const owner = req.body;
    const ownerId = `o${Date.now()}`;
    // Only a shallow copy. lodash.cloneDeep then add prop?
    const addingOwner = { ownerId, ...owner };

    createOwner(ownerId, addingOwner)
    .then(() => {
        res.status(201).send({ addingOwner });
    });
};

module.exports = {
    getOwner,
    getAllOwners,
    getOwnerPets,
    getQueriedPets,
    getPet,
    updateOwner,
    addOwner
};
