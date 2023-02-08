const { 
    fetchOwner, 
    fetchAllOwners, 
    fetchOwnerPets, 
    fetchAllPets, 
    fetchPet, 
    createOwner
} = require('./models');

const getOwner = (req, res) => {
    const { ownerId } = req.params;
    
    fetchOwner(ownerId)
    .then(parsedOwner => {
        res.status(200).send({ owner: parsedOwner });
    });
}

const getAllOwners = (req, res) => {
    fetchAllOwners()
    .then(owners => {
        res.status(200).send({ owners });
    });
};

const getOwnerPets = (req, res) => {
    const { ownerId } = req.params

    fetchOwnerPets(ownerId)
    .then(ownerPets => {
        res.status(200).send({ pets : ownerPets });
    });
};

const getAllPets = (req, res) =>{
    const { temperament } = req.query;

    fetchAllPets()
    .then(pets => {
        //if (temperament !== undefined) ?
        const queriedPets = pets.filter(pet => pet.temperament === temperament);
        
        res.status(200).send({ pets : queriedPets });

        //default logic?
    });
};

const getPet = (req, res) => {
    const { petId } = req.params;
    
    fetchPet(petId)
    .then(parsedPet => {
        res.status(200).send({ pet: parsedPet });
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
    // Only a shallow copy.
    const addingOwner = { ownerId, ...owner };

    createOwner(ownerId, addingOwner)
    .then(() => {
        res.status(201).send({ owner: addingOwner });
    });
};

module.exports = {
    getOwner,
    getAllOwners,
    getOwnerPets,
    getAllPets,
    getPet,
    updateOwner,
    addOwner
};