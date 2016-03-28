var http = require('http'),
template = require('swig');
pg = require('pg')

var server = new http.Server(),
    connectionString = "postgres://postgres:postgres@localhost:5432/ai_recipe";

server.listen(8880, '127.0.0.1');

server.on('request', function(req, res){

console.log('Сеервер Работает')

});
