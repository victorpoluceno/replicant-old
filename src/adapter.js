var klass = require('klass');

exports.Adapter = klass({
    source: null,
    initialize: function (source){
    },
    create: function (hash){
        console.warning('Method create not implemented!');
    },
    update: function (hash){
        console.warning('Method update not implemented!');
    },
    delete: function (hash){
        console.warning('Method delete not implemented!');
    }
});