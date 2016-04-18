
var upload = function(options, callback) {
	var file = options.file;
	_uploadFiletoAmazon(file, options.collection, callback);


};

var _uploadFiletoAmazon = function(file, collection, callback) {
	const uploader = new Slingshot.Upload("resumeUploads");
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