var MedicosDAO = function (db) {
    this.db = db;
};
 
_.extend(MedicosDAO.prototype, {
 
  createTable: function(callback) {
    this.db.transaction(
        function(tx) {
            var sql =
                "CREATE TABLE IF NOT EXISTS medicos ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "nombre VARCHAR(50), " +
                "deleted INTEGER, " +
                "lastModified VARCHAR(50))";
            tx.executeSql(sql);
        },
        this.txErrorHandler,
        function() {
            console.log('Table medicos CREATED in local SQLite database');
            callback();
        }
    );
  },

  findAll:function (callback) {
    this.db.transaction(
      function (tx) {
        var sql = "SELECT * FROM medicos ORDER BY nombre";
        tx.executeSql(sql, [], function (tx, results) {
          var len = results.rows.length;
          var data = [];
          for (var i = 0; i < len; i++) {
            data[i] = results.rows.item(i);
          }
          callback(data);
        });
      },
      function (tx, error) {
        console.log("Transaction Error: " + error);
      }
    );
  },
 
  create:function (model, callback) {
		//        TODO: Implement
  },
 
  update:function (model, callback) {
		//        TODO: Implement
  },
 
  destroy:function (model, callback) {
		//        TODO: Implement
  },
 
  find:function (model, callback) {
    this.db.transaction(
      function (tx) {
        var sql = "SELECT * FROM medicos WHERE id = " + model.id;
        tx.executeSql(sql, [], function (tx, results) {
          var len = results.rows.length;
          var data = [];
          for (var i = 0; i < len; i++) {
            data[i] = results.rows.item(i);
          }
          callback(data);
        });
      },
      function (tx, error) {
        console.log("Transaction Error: " + error);
      }
    );
  },
 
	//  Populate table with sample data
  populate:function (callback) {
        this.db.transaction(
            function (tx) {
                var sql = "CREATE TABLE IF NOT EXISTS medicos ( " +
                          "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                          "nombre VARCHAR(50), " +
                          "deleted INTEGER, " +
                          "lastModified VARCHAR(50))";
                console.log('Creating Medicos table');
                tx.executeSql(sql);
                console.log('Inserting medicos');
                tx.executeSql("INSERT INTO medicos VALUES (1,'Medico Uno', 0, null)");
                tx.executeSql("INSERT INTO medicos VALUES (2,'Medico Dos', 0, null)");
            },
            function (tx, error) {
                console.log('Transaction error ' + error);
            },
            function (tx) {
                callback();
            }
        );
  }
});