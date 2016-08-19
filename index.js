const Database = require('./lib/database');
const Collection = require('./lib/collection');

Database.Collection = Collection;
module.exports = Database;