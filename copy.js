var http = require('http'),
template = require('swig');
pg = require('pg')

var server = new http.Server(),
    connectionString = "postgres://postgres:postgres@localhost:5432/market";

server.listen(8880, '127.0.0.1');

server.on('request', function(req, res){

var tmpl = template.compileFile('./templates/html-file.html'),
film_list = [];



pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log({ success: false, data: err});
    }

    // SQL Query > Insert Data

    var query = client.query("SELECT * FROM movie ORDER BY id ASC");
//
//    // Stream results back one row at a time
    query.on('row', function(row) {
        film_list.push(row);
    });
	
	
//
    // After all data is returned, close connection and return results
    query.on('end', function() {
	
	var row_length = 4,
	new_results = []
	for (var i = 0; i < 4; i++) {
	new_results.push(film_list[i])
	}
		client.end()
        return res.end(tmpl(
                    {
                        'film_list': [
						new_results,
						new_results,
						new_results,
						new_results
                     ],
					 'title': 'Фильмы'
                    }
					)
					)
        });
    });
  });


