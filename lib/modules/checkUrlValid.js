var _fileExistsInDatabase = function( url ){
  return Resumes.findOne( { "url": url, "userId": Meteor.userId() }, { fields: { "_id": 1 } } );
};

var _isNotAmazonUrl = function( url ) {
  return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
};

var _validateUrl = function( url ){
  if ( _fileExistsInDatabase( url ) ) {
    return { valid: false, error: "Sorry, this file already exists!" };
  }

  if ( _isNotAmazonUrl( url ) ) {
    return { valid: false, error: "Sorry, this isn't a valid URL!" };
  }

  return { valid: true };
};

var validate = function( url ) {
  var test = _validateUrl( url );

  if ( !test.valid ) {
    throw new Meteor.Error( "file-error", test.error );
  }
};

Modules.lib.checkUrlValid = validate;