var Adapter = require('../adapter').Adapter;

function random() {
    return Math.floor(Math.random() * 90000) + 10000;
}

exports.Product = Adapter.extend({
    delete: function(hash) {
        console.log("Product deleted: " + hash.id);
    },
    update: function (hash){
        console.log("Product changed: " + hash.id);
    },
    create: function (hash){
        console.log("Product created: " + hash.id);
        // TODO some code that save hash on a backend here
        return random();
    }
});
