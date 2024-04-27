import mysql from "mysql2"
export class DatabaseEngine {
    constructor() {
        var connection = mysql.createConnection({
            host: "localhost",
            user: "ludo",
            password: "Ludo.Admin01",
        });
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });

          connection.query(
            'SELECT user FROM mysql.user;',
            function (err, results, fields) {
              console.log(results); // results contains rows returned by server
              console.log(fields); // fields contains extra meta data about results, if available
            }
          );
    }
}