// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var path = require('path');

var HTTP_OK = 200,
var HTTP_ERR_UNKNOWN = 500,
var HTTP_ERR_NOT_FOUND = 404;

httpServer.listen(8080);

function requestHandler(req, res) {

	var filepath =  (req.url == '/' ? 'karaoke.html' : './images' +req.url) ,
	fileext = path.extname(filepath); 
	console.log("Request for " + filepath+ " received.");

	fs.exists(filepath, function (f) {
		console.log(f);
		if (f) {

			fs.readFile(filepath, function (err, content) {
				if (err) {
					res.writeHead(HTTP_ERR_UNKNOWN);
					res.end();
				} else {
					res.writeHead(HTTP_OK, contentType(fileext));
					res.end(content);
				}
			});
		} else {
			res.writeHead(HTTP_ERR_NOT_FOUND);
			res.end();
		}
	});
}

function contentType(ext) {
	var ct;

	switch (ext) {
		case '.html':
		ct = 'text/html';
		break;
		case '.css':
		ct = 'text/css';
		break;
		case '.js':
		ct = 'text/javascript';
		break;
		case '.png':
		ct = 'image/png';
		break;
		default:
		ct = 'text/plain';
		break;
	}

	return {'Content-Type': ct};
}

// WebSocket Portion

var numberOfLikes=0;
var numberOfDisLikes=0;
var users = [];

// import socket.io library
var io = require('socket.io').listen(httpServer);

// if the user connects to the socket
io.sockets.on('connection',
	function (socket) {
		console.log("We have a new client: " + socket.id);

		//Adding new user to array list
        socket.on('addUser', function(user) {
            socket.user = user;
            console.log("ID: " + user);
            users.push(user);
            updateClients();

        });

        // like and dislike count
		socket.on('button_id', function(data) {
			console.log("got button id: " + data);
			
			if(data === "like"){
				//console.log("got button id:");
				numberOfLikes = numberOfLikes+1;
				console.log(numberOfLikes.toString());
			}
			
			else if(data === "disLike"){
				numberOfDisLikes= numberOfDisLikes+1;
				console.log(numberOfDisLikes.toString());
			}

             io.sockets.emit('nlikes',numberOfLikes.toString());
             io.sockets.emit('nDisLikes',numberOfDisLikes.toString());
			
		});

        // get audio filter status to trigger audience's othersFilter()
		socket.on ('appyFilter', function(filterExecuted) {
			socket.emit('othersFilter');
		});


        // get backgorund status to make audience playing  the same background music
		socket.on('playBg', function(ran){
			socket.emit('othersPlayBg', ran);
		});  


        //Delete user from array list when disconnect
         socket.on('disconnect', function() {
          for (var i = 0; i < users.length; i++) {
             if (users[i] == socket.user) {
                users.splice(i,1);
                //delete users[users[i]];
             }
          }
          updateClients();
         });
         
        // emit the number of users now
        function updateClients() {
         io.sockets.emit('update', users);
         console.log("TOTAL USER: " + users.length);
        }

});
