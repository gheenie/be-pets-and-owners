const fs = require('fs/promises');

const fetchOwner = ownerId => {
    return fs.readFile(`${__dirname}/data/owners/${ownerId}.json`)
    .then(owner => {
        return JSON.parse(owner);
     });
};

module.exports = {
    fetchOwner
}
