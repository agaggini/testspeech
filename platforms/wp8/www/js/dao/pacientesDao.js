var PacientesDAO = function (db) {
	this.db = db;
};

_.extend(PacientesDAO.prototype, {

	findAll:function (callback) {
		this.db.transaction(
			function (tx) {
				var sql = "SELECT * FROM pacientes ORDER BY nombre";
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
		this.db.transaction(
			function (tx) {
				var sql = "INSERT INTO pacientes VALUES( null, ?, 0, null )";
				var params = [model.get('nombre')];
				tx.executeSql(sql, params, function (tx, results) {
					callback(results);
				});
			},
			function (tx, error) {
				console.log("Transaction Error: " + error);
			}
		);		
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
        var sql = "SELECT * FROM pacientes WHERE id = " + model.id;
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
				var sql =	"CREATE TABLE IF NOT EXISTS pacientes ( " +
									"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
									"nombre VARCHAR(50), " +
									"deleted INTEGER, " +
                  "lastModified VARCHAR(50) " +
									")";
				console.log('Creating Pacientes table');
				tx.executeSql(sql);
			},
			function (tx, error) {
				alert('Transaction error ' + error);
			},
			function (tx) {
				callback();
			}
		);
	}
});