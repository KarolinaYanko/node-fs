// Safe Sending File Example
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/public';

http.createServer(function(req, res){
	if(!checkAccess(req)){
		req.statusCode = 403;
		res.end('Tell me the secret to access');
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess (req) {
	return url.parse(req.url, true).query.secret == 'o_O';
}

function sendFileSafe (filePath, res) {
	try{
		filePath = decodeURIComponent(filePath);
	} catch(e){
		res.statusCode = 404;
		res.end('Bad Request');
		return;
	}

	if(~filePath.indexOf('\0')){
		res.statusCode = 404;
		res.end('Bad Request');
		return;
	}

	filePath.normalize(path.join(ROOT, filePath));

	if(filePath.indexOf(ROOT) !=0){
		res.statusCode = 404;
		res.end('File Not Found');
		return;
	}

	fs.stat(filePath, function(err, stats){
		if(err || !stats.isFile()){
			res.statusCode = 404;
			res.end('File Not Found');
			return;
		}

		sendFile(filePath, res);
	});
}

function sendFile (filePath, res) {
	fs.readFile(filePath, function(err, content){
		if(err) throw err;

		var mime = require('mime').lookup(filePath);
		res.setHeader('Content-Type', mime + '; charset=utf-8');
		res.end(content);
	});
}