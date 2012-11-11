var klass = require('klass');
var couchdb = require('./couchdb');

exports.Store = klass({
    initialize: function (config){
        this.config = config;
    },
    start: function (){
        // FIXME should abstract this into a backend
        var db = new couchdb.CouchDB(this.config);
        db.listen(function (change){ // FIXME change should be can be an opac object
            var type = change.doc.type;
            if (sources.indexOf(type)){
                console.warn('Skipping change for doc: ' + change.id);
                return;
            }

            // FIXME can be better
            klass_name = type.charAt(0).toUpperCase() + type.slice(1);
            var Source = require('./sample/' + type)[klass_name];
            var adapter = new Source();

            if (change.deleted){
                adapter.delete(change);
            } else if (change.changes[0].rev.indexOf('1-') === 0 ){ // first revision means create operation
                    // callback source adapter and get id
                    adapter.create(change, function (err, id){
                        if (err){
                            console.error(err); // FIXME throw an error
                        } else {
                            db.merge(doc.id, res, function (err, id){
                                if (err){
                                    console.error(err); // FIXME throw an error
                                }
                            });
                        }
                    });
            } else { // then its an update
                adapter.update(change);
            }
        });
    },
});