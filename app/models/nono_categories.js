var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_CategorySchema = mongoose.Schema({
   
		Category_Code                       :Number,
        Category_Name                       :String,
        Category_Description                :String,
		Category_MetaTitle                  :String,
		Category_FocusKeyWord               :String,
        Category_KeyeordsList               :[String],
        Category_FeaturedImage_Media_ID     :Number,
        Category_URL                        :String,
        Category_ParentCategory_Category_ID :Number,
        Category_IsActive                   :Number,
});



var Category = module.exports = mongoose.model('nono_category', nono_CategorySchema);



module.exports.getLastCode = function(callback){
    
    Category.findOne({},callback).sort({Category_Code:-1});
}