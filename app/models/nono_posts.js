var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_PostsSchema = mongoose.Schema({
   
		Post_Code                       :Number,
        Post_Title                      :String,
        Post_URL                        :String,
		Post_Content                    :String,
		Post_FocusKeyword               :String,
        Post_MetaDescription            :String,
        Post_FeaturedImage_Media_ID     :Number,
        Post_KeywordsList               :[String],
        Post_CategoriesList_Category_ID :[Number],
        Post_TagsList_Tag_ID            :[Number],
        Post_CreatedBy_User_ID          :Number,
        Post_CreatedOn                  :Date,
        Post_SentToPublishOn            :Date,
        Post_PublishedBy_User_ID        :Number,
        Post_PublishedOn                :Date,
        Post_Status                     :Number,

});



var Post = module.exports = mongoose.model('nono_post', nono_PostsSchema);



module.exports.getLastCode = function(callback){
    
    Post.findOne({},callback).sort({Post_Code:-1});
}