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

module.exports = {
    fetchOwner,
    fetchAllOwners
}
