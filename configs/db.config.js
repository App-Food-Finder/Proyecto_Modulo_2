const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/proyecto_modulo_2";

mongoose
    .connect(MONGODB_URI)
    .then(() => console.info(`Successfully connected to database`))
    .catch((error) => console.error('An error ocurred', error));