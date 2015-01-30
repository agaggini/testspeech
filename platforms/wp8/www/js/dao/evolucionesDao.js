var EvolucionesDAO = function (db) {
    this.db = db;
};
 
_.extend(EvolucionesDAO.prototype, {
 
  createTable: function(callback) {
    this.db.transaction(
        function(tx) {
            var sql =
                "CREATE TABLE IF NOT EXISTS evoluciones ( " +
                "paciente_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "fecha DATE, " +
                "detalle VARCHAR(250), " +
                "deleted INTEGER, " +
                "lastModified VARCHAR(50))";
            tx.executeSql(sql);
        },
        this.txErrorHandler,
        function() {
            console.log('Table evoluciones CREATED in local SQLite database');
            callback();
        }
    );
  },

  findAll:function (callback) {
    this.db.transaction(
      function (tx) {
        var sql = "SELECT * FROM evoluciones ORDER BY paciente_id, fecha";
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
        var sql = "SELECT * FROM evoluciones WHERE paciente_id = " + model.id;
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
                var sql = "CREATE TABLE IF NOT EXISTS evoluciones ( " +
                          "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                          "fecha DATE, " +
                          "detalle VARCHAR(250), " +
                          "deleted INTEGER, " +
                          "lastModified VARCHAR(50))";
                console.log('Creating Evoluciones table');
                tx.executeSql(sql);
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