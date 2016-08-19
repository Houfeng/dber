const Class = require('cify').Class;

const Database = new Class({

  constructor: function (path, options) {
    options = options || {};
    this.path = path;
    this.options = options;
    this.collections = {};
  },

  collection: function (name) {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(this, name);
    }
    return this.collections[name];
  }

});
