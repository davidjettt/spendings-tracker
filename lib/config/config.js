// require('dotenv').config()

// module.exports = {
//   development: {
//     url: process.env.DEV_DATABASE_URL || 'aksdfklasdf',
//     dialect: 'postgres',
//   },
//   test: {
//     url: process.env.TEST_DATABASE_URL,
//     dialect: 'postgres',
//   },
//   production: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//   },
// }
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFIle,
    dialect: "postgres",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
