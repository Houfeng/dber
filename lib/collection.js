const Class = require('cify').Class;
const fs = require('fs');
const Locker = require('lockman');
const pkg = require('../package.json');
const Query = require('./query');
const consts = require('./consts');

const writeLocker = new Locker(pkg.name + '-write');

const Collection = new Class({

  constructor: function (database, name) {
    this.name = name;
    this.database = database;
    this._filename = path.resolve(this.database.path, this.name + consts.DATA_EXTNAME);
    this._postion = fs.statSync(this._filename).size;
    this._attchQueryMethods();
  },

  _attchQueryMethods: function () {
    ['find', 'sort', 'skip', 'limt'].forEach(function (method) {
      this[method] = function (param, callback) {
        var query = new Query(this)[method](param);
        if (callback) query.exec(callback);
        return query;
      }.bind(this);
    }, this);
  },

  insert: function (doc, callback) {
    writeLocker.lock(function () {

      writeLocker.unlock();
    });
  },

  delete: function (condition, callback) {
    writeLocker.lock(function () {

      writeLocker.unlock();
    });
  },

  update: function (condition, sets, callback) {
    writeLocker.lock(function () {

      writeLocker.unlock();
    });
  }

});
