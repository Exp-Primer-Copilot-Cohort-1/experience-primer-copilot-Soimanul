// Create web server

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('./public/index.html', 'UTF-8', function(err, html) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    } else if (req.url.match(/.css$/)) {
        var cssPath = __dirname + '/public' + req.url;
        var fileStream = fs.createReadStream(cssPath, 'UTF-8');
        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    } else if (req.url.match(/.jpg$/)) {
        var imgPath = __dirname + '/public' + req.url;
        var imgStream = fs.createReadStream(imgPath);
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        imgStream.pipe(res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 File Not Found');
    }
}).listen(3000);

console.log('Server running on port 3000');