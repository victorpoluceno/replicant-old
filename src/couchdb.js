var klass = require('klass');
var cradle = require('cradle');

exports.CouchDB = klass({
    initialize: function (config){
        this.config = config;
    },
    listen: function (cb){
        this.connection = new(cradle.Connection)(
            this.config.host, 
            this.config.port, {
                auth: {
                    username: this.config.username, 
                    password: this.config.password
                },
                // FIXME we can't use https because of this bug 
                // https://github.com/cloudhead/cradle/pull/180 
                secure: false,
            }
        );

        this.database = this.connection.database(this.config.database);
        this.database.exists(function (err, exists) {
            if (err) {
                console.error(err); // FIXME throw an error
            } else if (!exists) {
                db.create(function(err, res){
                    if (err)
                        console.error(err); // FIXME throw an error
                });
            } else {     
                var sources = this.config.sources;
                var feed = this.database.changes({include_docs: true});
                feed.on('change', function (change) {
                    cb(change);
                });  
            }
        });
    },
});