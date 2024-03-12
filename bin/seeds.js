require('dotenv').config();
require('../configs/db.config');

const Establishment = require('../models/establishment.model');
const establishments = require('../data/establishments');

Establishment.create(establishments)
    .then((establishments) => console.log(`${establishments.length} establishments created`))
    .catch((error) => console.error(error));