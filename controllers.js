const { fetchOwner } = require('./models');

const getOwners = (req, res) => {
    const { ownerId } = req.params;
    
    fetchOwner(ownerId)
    .then(parsedOwner => {
        res.status(200).send({ owner: parsedOwner });
    });
}

module.exports = {
    getOwners
};
