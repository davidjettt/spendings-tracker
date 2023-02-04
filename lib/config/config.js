const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFIle,
    dialect: "postgres",
    seederStorage: 'sequelize',
    // logQueryParameters: true,
    // typeValidation: true
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
