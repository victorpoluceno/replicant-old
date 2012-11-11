var klass = require('klass');
var Store = require('./store').Store;

exports.Server = Server = klass({
    initialize: function (config){
        this.config = config;
    },
    run: function (){
        var store = new Store(this.config);
        store.start();
    }
});