var fs = require('fs');
var yaml = require('js-yaml');
var Server = require('./src/server').Server;

(function main(){
    var f = fs.readFileSync('sample/config.yml');
    var config = yaml.load(f);
    new Server(config).run();
})();