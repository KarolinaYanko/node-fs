//simple fs methods

var fs = require('fs');

// async reading read.js file
fs.readFile(__filename, {encoding: 'utf-8'}, function(err, data){
	if(err){
		console.error(err);
	} else {
		console.log(data.toString( ));
	}
});

// reading file with checking existing
fs.stat(__filename, function(err, stats){
	console.log(stats.isFile());
	console.log(stats);
});

//create, rename, remove file
fs.writeFile('file.tmp', 'data', function(err){
	if(err) throw err;
	console.log('Create file.tmp');

	fs.rename("file.tmp", "new.tmp", function(err){
		if(err) throw err;
		console.log('Rename file.tmp to new.tmp');

		fs.unlink('new.tmp', function(err){
			if(err) throw err;
			console.log('Remove new.tmp');
		});
	});
});