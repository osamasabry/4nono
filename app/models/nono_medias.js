var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_TagsSchema = mongoose.Schema({
   
		Media_Code                    :Number,
        Media_Type                    :String,
        Media_URL                     :String,
		Tag_MetaTitle                 :String,
		Media_Description             :String,
        Media_DescriptionKeywords     :[String],
        Media_ReplacedText            :String,
        

});


var Tags = module.exports = mongoose.model('nono_tag', nono_TagsSchema);



module.exports.getLastCode = function(callback){
    
    Tags.findOne({},callback).sort({Tag_Code:-1});
}