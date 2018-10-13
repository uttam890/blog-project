var mysql = require("mysql");

const dbConfig = {
  'host': "localhost",
  'user': "testuser",
  'password': "test123",
  'database': "e_commerce"
}

global.mysqlDb = null;
function setupMySql() {
  global.mysqlDb = mysql.createConnection(dbConfig);
}
setupMySql();

// If you're also serving http, display a 503 error.
global.mysqlDb.on("error", function (error) {
  // console.log("Database connection lost, reconnecting..", error);
  if (error.code === "PROTOCOL_CONNECTION_LOST") {
    // Connection to the MySQL server is usually
    setupMySql(); // lost due to either server restart, or a
  } else {
    Raven.captureException(error);
    // connnection idle timeout (the wait_timeout
    throw error; // server variable configures this)
  }
});

module.exports = global.mysqlDb;
