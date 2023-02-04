#!/user/bin/env node
// backend/bin/ww

// Import environment variables
require('dotenv').config();

const { port } = require('../config');

const app = require('../');
const db = require('../models');

// Check the database connection before starting the app
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection success! Sequelize is ready to use...');

        // Start listening for connections
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch((err) => {
        console.log('Database connection failure.');
        console.log(err);
    });
