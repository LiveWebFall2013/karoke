var port = 8080; // where to listen?

var http = require('http').createServer(handler);
http.listen(port);
console.log('Server running on port ' + port);

var fs = require('fs');

// socket.io stuff
var io = require('socket.io').listen(http);

var songDB = 
  [
   {"name" : "We Will Rock You",
     "artist" : "Queen", 
     "url": "http://somethingsomething",
     "lyrics" : [
       {"startMS": 12200,
       "endMS": 14400,
        "line": "Buddy you're a boy make a big noise"},
       {"startMS": 14500,
       "endMS":  17600,
        "line": "Playin' in the street gonna be a big man some day"},
       {"startMS": 17700,
       "endMS": 19300,
        "line": "You got mud on yo' face"},
       {"startMS": 19500,
       "endMS": 20700,
        "line": "You big disgrace"},
       {"startMS": 21000,
       "endMS": 23500,
        "line": "Kickin' your can all over the place"},
       {"startMS": 23600,
       "endMS": 24000,
        "line": "Sing it"},
       {"startMS": 24100,
       "endMS": 28000,
        "line": "We will we will rock you"},
       {"startMS": 30000,
       "endMS": 34000,
        "line": "We will we will rock you"},
       {"startMS": 36000,
       "endMS": 38000,
        "line": "Buddy you're a young man hard man"},
       {"startMS": 38000,
       "endMS": 41000,
        "line": "Shoutin' in the street gonna take on the world some day"},
       {"startMS": 41000, 
       "endMS": 42100,
        "line": "You got blood on yo' face"},
       {"startMS": 43100,
       "endMS": 44400,
        "line": "You big disgrace"},
       {"startMS": 44600,
       "endMS": 47400,
        "line": "Wavin' your banner all over the place"},
       {"startMS": 47600,
       "endMS": 51700,
        "line": "We will we will rock you"},
       {"startMS": 52500,
       "endMS":  53300,
        "line": "Sing it!"},
       {"startMS": 53600,
       "endMS": 57500,
        "line": "We will we will rock you"},
       {"startMS": 59500,
       "endMS": 61700,
        "line": "Buddy you're an old man poor man"},
       {"startMS":  61800,
       "endMS": 64836,
        "line": "Pleadin' with your eyes gonna make you some peace some day"},
       {"startMS": 64873,
       "endMS": 66514,
        "line": "You got mud on your face"},
       {"startMS": 66881,
       "endMS": 67940,
        "line": "You big disgrace"},
       {"startMS": 67989,
       "endMS": 70934,
        "line": "Somebody better put you back into your place"},
       {"startMS": 71326,
       "endMS": 75007,
        "line": "We will we will rock you"},
       {"startMS": 75449,
       "endMS": 76053,
        "line": "(Sing it!)"},
       {"startMS": 77216,
       "endMS": 80868,
        "line": "We will we will rock you"},
       {"startMS": 82501,
       "endMS": 83090,
        "line": "Everybody"},
       {"startMS": 83139,
       "endMS": 86893,
        "line": "We will we will rock you"},
       {"startMS": 89053,
       "endMS": 92758,
        "line": "We will we will rock you"},
       {"startMS": 94314,
       "endMS": 94840,
        "line": "Alright"}
      ]
    }
  ];

io.sockets.on('connection', function (socket) {
  socket.emit('song', songDB[0]);
});

// handle a request for the index page
var handler = function(req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    }
  );
};

