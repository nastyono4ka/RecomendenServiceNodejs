var pg = require('pg'), 
    http = require('http'),  
    template = require('swig');  
	
	
      connectionString = "postgres://postgres:postgres@localhost:5432/allinfo";
      user_list = [];
	  
	pg.connect(connectionString, function(err, client, done) { 
    
    if(err) { 
      done(); 
      console.log({ success: false, data: err}); 
   } 

     var query = client.query("SELECT u, ARRAY_AGG (movie_id) FROM users AS u JOIN likes AS l ON l.user_id = u.id GROUP BY (u.id)");
	 query.on('row', function(row) { 
         user_list.push(row);
		 });
		
		 
		 query.on('end', function() {

         		console.log(user_list) 
	 });
   });