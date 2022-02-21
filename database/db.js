const sqlite = require('sqlite3');
const path = require('path');
module.exports = {
    getDB(){
        if(!this.db){
            this.db = new sqlite.Database(path.join(__dirname, '../database.sqlite'));
        }
        return this.db;
    }
}