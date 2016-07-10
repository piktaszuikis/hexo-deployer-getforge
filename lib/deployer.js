'use strict';

var fs = require('hexo-fs');
var archiver = require('archiver');
var request = require('request');

var ZIP_FILENAME = 'public.zip';

function uploadArchive(args) {
	console.log('Uploading file');
	
	request.post({
		url: 'https://getforge.com/api/cli/deploy',
		gzip: false,
		formData: {
			archive: fs.createReadStream(ZIP_FILENAME),
			token: args.token,
			domain: args.domain
		}
	}, function(err, httpResponse, body){
			if (err)
				return console.error('getforge: upload failed:', err);

			console.log('getforge: Upload successful! Server responded with:', 
				httpResponse.statusCode, httpResponse.statusMessage, body);
			
			fs.unlink(ZIP_FILENAME);
	});
	
}

function compressZipArchive(args) {

	console.log('getforge: Ziping ', this.public_dir);

	var stream = fs.createWriteStream(ZIP_FILENAME)
		.on('close', uploadArchive.bind(this, args));
		
	var archive = archiver('zip').directory(this.public_dir, '/');
	archive.pipe(stream);
	archive.finalize();
}

module.exports = function(args) {
	
	if(args.token)
		compressZipArchive.call(this, args);
	else {
		var that = this;
		request.post({
			url: 'https://getforge.com/api/cli/login',
			gzip: false,
			form:{
				email: args.username,
				password: args.password
			},
		}, function(err, httpResponse, body){
			if (err)
				return console.error('getforge: login failed:', err);

			var json = JSON.parse(body);
			
			if(json.error){
				console.error('getforge: Login failed: ', json.error);
				return;
			}
			
			if(json.name && json.token){
				console.log('getforge: Loged in as ', json.name, 'with token: ', json.token);
				args.token = json.token;
				compressZipArchive.call(that, args);
			}else{
				console.error('getforge: Failed to login: expected name and token. Response was: ', body);
			}
		});
	}

  return true;
};
