const { fetchOwner, fetchAllOwners, fetchOwnerPets, fetchAllPets } = require('./models');

const getOwners = (req, res) => {
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

module.exports = {
    getOwners,
    getAllOwners,
    getOwnerPets,
    getAllPets
};
