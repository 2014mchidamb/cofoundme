var uploader;
var upload = function(options, callback) {
	var file = options.file;
	_uploadFiletoAmazon(file, options.collection, callback);


};

var progress = function(){
	if(!uploader)
		return 0;
	return uploader.progress();
};

var _uploadFiletoAmazon = function(file, collection, callback) {
	uploader = new Slingshot.Upload("resumeUploads");
	uploader.send(file, function(error, url){
		if(error){
			console.log(error.message);
		}
		else{
			_addUrlToDatabase(url, collection);
			callback(url);
		}
	});

};

var _addUrlToDatabase = function(url, collection){
	Meteor.call("storeUrlInDatabase", url, collection, function(error){
		if(error)
			console.log(error);
	});
};

Modules.client.uploadToS3 = upload;
Modules.client.uploadToS3Progress = progress;