//Reading file with streams
var fs = require('fs');

var stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', function(){
	var data = stream.read();
	console.log(data);
});

stream.on('end', function(){
	console.log('THE END');
});

stream.on('error', function(err){
	if (err.code == 'ENOENT'){
		console.log("File Not Found");
	} else{
		console.error(err);
	}
});