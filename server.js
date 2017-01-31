var http = require("http");
var fs = require('fs');
var url = require('url');
var catamaran = require('./catamaran/catamaran.node');

// Create a server
http.createServer( function (request, response) {  
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
    
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");
   
    // Read the requested file content from file system
    if (pathname == '/catamaran/Demo') {
        // Page found	  
        // HTTP Status: 200 : OK
        // Content Type: text/plain
        response.writeHead(200, {'Content-Type': 'text/html'});
        
        // Write the content of the file to response body
        response.write(catamaran.demo());		

        // Send the response body 
        response.end();            
    } else {
        fs.readFile('catamaran' + pathname, function (err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {	
                //Page found	  
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {'Content-Type': 'text/html'});	
         
                // Write the content of the file to response body
                response.write(data.toString());		
            }   
            // Send the response body 
            response.end();            
        });
    }

}).listen(8081);

// Console will print the message
console.log('Server running at http://ygao34.web.engr.illinois.edu:8081');