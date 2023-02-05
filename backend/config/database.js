const config = require('./index');

module.exports = {
  development: {
    // storage: config.dbFile,
    username: 'davidjetsupphasuk',
    password: 'dannieriel',
    database: 'testing',
    dialect: "postgres",
    // seederStorage: "sequelize",
    // seederStorageTableName: ,
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
