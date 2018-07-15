var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_TagsSchema = mongoose.Schema({
   
		Tag_Code                    :Number,
        Tag_Name                    :String,
        Tag_Description             :String,
		Tag_MetaTitle               :String,
		Tag_FocusKeyWord            :String,
        Tag_KeyeordsList            :[String],
        Tag_FeaturedImage_Media_ID  :Number,
        Tag_URL                     :String,
        Tag_IsActive                :Number,

});


var Tags = module.exports = mongoose.model('nono_tag', nono_TagsSchema);



module.exports.getLastCode = function(callback){
    
    Tags.findOne({},callback).sort({Tag_Code:-1});
}