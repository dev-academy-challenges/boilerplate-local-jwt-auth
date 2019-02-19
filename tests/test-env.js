const getDbConn = require('knex')

const testConfig = require('../knexfile').test

module.exports = {
  // Get a connection to the test database
  getTestDb: () => getDbConn(testConfig),

  // Create a separate in-memory database
  initialise: (db) => {
    return db.migrate.latest()
      .then(() => {
        return db.seed.run()
      })
  },

  // Destroy the database connection
  cleanup: (db) => {
    return db.destroy()
  }
}
