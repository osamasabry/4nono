var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var nono_CpUserSchema = mongoose.Schema({
   
		CP_User_Code                  :Number,
        CP_User_Name                  :String,
        CP_User_Password              :String,
		CP_User_DisplayName           :Number,
		CP_User_ProfilePic_Media_ID   :Number,
        CP_User_Bio                   :String,
        CP_User_Permissions           :[Number],
        CP_User_IsActive               :Number
});

nono_CpUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

nono_CpUserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.CP_User_Password);
};


nono_CpUserSchema.methods.updatePassword = function(password) {
    this.CP_User_Password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	this.save();
};



var CPUser = module.exports = mongoose.model('nono_cp_user', nono_CpUserSchema);



module.exports.getLastCode = function(callback){
    
    CPUser.findOne({},callback).sort({CP_User_Code:-1});
}