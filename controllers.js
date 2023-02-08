const { fetchOwner, fetchAllOwners } = require('./models');

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

module.exports = {
    getOwners,
    getAllOwners
};
