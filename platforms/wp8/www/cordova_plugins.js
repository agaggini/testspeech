cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.sqlite/www/SQLitePlugin.js",
        "id": "com.phonegap.plugins.sqlite.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/com.millerjames01.sqlite-plugin/www/SQLitePlugin.js",
        "id": "com.millerjames01.sqlite-plugin.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.sqlite": "1.0.0",
    "com.millerjames01.sqlite-plugin": "1.0.1"
}
// BOTTOM OF METADATA
});