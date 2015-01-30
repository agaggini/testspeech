var ObrassocialesDAO = function (db) {
    this.db = db;
};
 
_.extend(ObrassocialesDAO.prototype, {
 
  createTable: function(callback) {
    this.db.transaction(
      function(tx) {
        var sql =
            "CREATE TABLE IF NOT EXISTS obrassociales ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre VARCHAR(50), " +
            "deleted INTEGER, " +
            "lastModified VARCHAR(50))";
        tx.executeSql(sql);
      },
      this.txErrorHandler,
      function() {
        console.log('Table obrassociales CREATED in local SQLite database');
        callback();
      }
    );
  },

  findAll:function (callback) {
    this.db.transaction(
      function (tx) {
        var sql = "SELECT * FROM obrassociales ORDER BY nombre";
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
		//        TODO: Implement
  },
 
	//  Populate table with sample data
  populate:function (callback) {
    this.db.transaction(
      function (tx) {
        var sql = "CREATE TABLE IF NOT EXISTS obrassociales ( " +
                  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                  "nombre VARCHAR(50), " +
                  "deleted INTEGER, " +
                  "lastModified VARCHAR(50))";
        console.log('Creating Obrassociales table');
        tx.executeSql(sql);
        console.log('Inserting Obrassociales');
        tx.executeSql("INSERT INTO obrassociales VALUES (1,'Obra Social Uno', 0, null)");
        tx.executeSql("INSERT INTO obrassociales VALUES (2,'Obra Social Dos', 0, null)");
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