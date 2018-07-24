var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_MediasSchema = mongoose.Schema({
   
		Media_Code                    :Number,
        Media_Type                    :Number,
        Media_URL                     :String,
		Media_Title                   :String,
		Media_Description             :String,
        Media_DescriptionKeywords     :[String],
        Media_ReplacedText            :String,
        Media_images_url    		  :[String],
});


var Medias = module.exports = mongoose.model('nono_media', nono_MediasSchema);



module.exports.getLastCode = function(callback){
    
    Medias.findOne({},callback).sort({Media_Code:-1});
}