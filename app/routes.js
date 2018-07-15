var CPUser        	 = require('../app/models/nono_cp_users');
var Tags    		 = require('../app/models/nono_tags');
var Categories    = require('../app/models/nono_categories');


var  nextCode ='';
var data = [];

module.exports = function(app, passport,server,nodemailer,generator) {
	
	app.get('/logout', function(request, response) {
		request.logout();
		response.redirect('/');
	});

	app.post('/', function(req, res, next) {
		console.log("os");
	  	passport.authenticate('login', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.send(info); }
		    req.logIn(user, function(err) {
		      if (err) { return next(info); }
		      return res.send(user);
		    });
		  })(req, res, next);
	});


	app.post('/addUser',function (request, response){	
		async function AddNewUser(){
			var GetNextId = await getNextUserID();
			insetIntoUser(GetNextId);
		}
		function getNextUserID(){
			return new Promise((resolve, reject) => {
				CPUser.getLastCode(function(err,user){
					if (user) 
						resolve( Number(user.CP_User_Code)+1);
					else
						resolve(1);
				})
			})
		};
		function insetIntoUser(GetNextId){
			var newCPUser = new CPUser();
			newCPUser.CP_User_Code     		 		= GetNextId;
			newCPUser.CP_User_Name 	     	 		= request.body.user_name;
			newCPUser.CP_User_Password   	 		= newCPUser.generateHash(request.body.password);
			newCPUser.CP_User_DisplayName	 		= request.body.display_name;
			newCPUser.CP_User_ProfilePic_Media_ID   = request.body.media_id;
			newCPUser.CP_User_Bio   	 			= request.body.bio;
			newCPUser.CP_User_RoleList_Role_ID   	= request.body.role_id;
			newCPUser.CP_User_IsActive				= 1;
			newCPUser.save(function(error, doneadd){
				if(error){
					return response.send({
						message: error
					});
				}
				else{
					return response.send({
						message: true
					});
				}
			});
		}
		AddNewUser();
	});

	app.get('/getAllUsers', function(request, response) {
		CPUser.find({}, function(err, user) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (user) {
	        	
	            response.send(user);
	        } 
    	}).sort({CP_User_Code:-1}).limit(20)
	});

	app.post('/editUser',function (request, response){

		var newUser = new CPUser;

		var newvalues = { $set: {
				CP_User_Name 				: request.body.user_name,
				CP_User_Password 			: newUser.generateHash(request.body.desc), 
				CP_User_DisplayName 		: request.body.display_name,
				CP_User_ProfilePic_Media_ID : request.body.media_id,
				CP_User_Bio 				: request.body.bio,
				CP_User_RoleList_Role_ID 	: request.body.role_id,
				CP_User_IsActive 				: request.body.status,
			} };

		var myquery = { CP_User_Code: request.body.row_id }; 


		CPUser.findOneAndUpdate( myquery,newvalues, function(err, field) {
    	    if (err){
    	    	return response.send({
					// user : request.user ,
					message: 'Error'
				});
    	    }
            if (!field) {
            	return response.send({
					// user : request.user ,
					message: 'Usage Dose not exists'
				});
            } else {

                return response.send({
					message: true
				});
			}
		})
	});
	

	app.get('/getActiveUsers', function(request, response) {
		CPUser.find({CP_User_IsActive:1}, function(err, field) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (field) {
	        	
	            response.send(field);
	        } 
    	});
	});



	app.post('/addTag',function (request, response){	
		async function AddNewTag(){
			var GetNextId = await getNextTagID();
			insetIntoTag(GetNextId);
		}
		function getNextTagID(){
			return new Promise((resolve, reject) => {
				Tags.getLastCode(function(err,tag){
					if (tag) 
						resolve( Number(tag.Tag_Code)+1);
					else
						resolve(1);
				})
			})
		};
		function insetIntoTag(GetNextId){
			var newTag = new Tags();
			newTag.Tag_Code     		 		= GetNextId;
			newTag.Tag_Name 	     	 		= request.body.name;
			newTag.Tag_Description   	 		= request.body.desc;
			newTag.Tag_MetaTitle	 			= request.body.meta_title;
			newTag.Tag_FocusKeyWord   			= request.body.focus_keyword;
			newTag.Tag_KeyeordsList   	 	    = request.body.keyeords_list ;
			newTag.Tag_FeaturedImage_Media_ID  	= request.body.featured_image_media_id;
			newTag.Tag_URL   					= request.body.url;
			newTag.Tag_IsActive 				= 1;

			newTag.save(function(error, doneadd){
				if(error){
					return response.send({
						message: error
					});
				}
				else{
					return response.send({
						message: true
					});
				}
			});
		}
		AddNewTag();
	});

	app.get('/getAllTags', function(request, response) {
		Tags.find({}, function(err, tag) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (tag) {
	        	
	            response.send(tag);
	        } 
    	}).sort({Tag_Code:-1}).limit(20)
	});

	app.post('/editTag',function (request, response){

		var newvalues = { $set: {
				Tag_Name 					: request.body.name,
				Tag_Description 			: request.body.desc,
				Tag_MetaTitle 				: request.body.meta_title,
				Tag_FocusKeyWord 			: request.body.focus_keyword,
				Tag_KeyeordsList 			: request.body.keyeords_list,
				Tag_FeaturedImage_Media_ID 	: request.body.featured_image_media_id,
				Tag_URL 					: request.body.url,
				Tag_IsActive 				: request.body.status,
			} };

		var myquery = { Tag_Code: request.body.row_id }; 


		Tags.findOneAndUpdate( myquery,newvalues, function(err, field) {
    	    if (err){
    	    	return response.send({
					// user : request.user ,
					message: 'Error'
				});
    	    }
            if (!field) {
            	return response.send({
					// user : request.user ,
					message: 'Tags not exists'
				});
            } else {

                return response.send({
					message: true
				});
			}
		})
	});
	

	app.get('/getActiveTags', function(request, response) {
		Tags.find({Tag_IsActive:1}, function(err, field) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (field) {
	        	
	            response.send(field);
	        } 
    	});
	});
	


	app.post('/addCategory',function (request, response){	
		async function AddNewCategory(){
			var GetNextId = await getNextCategoryID();
			insetIntoCategory(GetNextId);
		}
		function getNextTagID(){
			return new Promise((resolve, reject) => {
				Categories.getLastCode(function(err,category){
					if (category) 
						resolve( Number(category.Category_Code)+1);
					else
						resolve(1);
				})
			})
		};
		function insetIntoCategory(GetNextId){
			var newCategory = new Categories();
			newCategory.Category_Code     		 	    	= GetNextId;
			newCategory.Category_Name 	     	 			= request.body.name;
			newCategory.Category_Description   	 			= request.body.desc;
			newCategory.Category_MetaTitle	 				= request.body.meta_title;
			newCategory.Category_FocusKeyWord   	    	= request.body.focus_keyword;
			newCategory.Category_KeyeordsList   	 		= request.body.keyeords_list ;
			newCategory.Category_FeaturedImage_Media_ID 	= request.body.featured_image_media_id;
			newCategory.Category_URL   						= request.body.url;
       		newCategory.Category_ParentCategory_Category_ID = request.body.parent_category;
       		newCategory.Category_Status 				  	= 1;


			newCategory.save(function(error, doneadd){
				if(error){
					return response.send({
						message: error
					});
				}
				else{
					return response.send({
						message: true
					});
				}
			});
		}
		AddNewCategory();
	});


	app.get('/getCategories', function(request, response) {
		Categories.find({}, function(err, Category) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (Category) {
	        	
	            response.send(Category);
	        } 
    	}).sort({Category_Code:-1}).limit(20)
	});


	app.post('/editCategory',function (request, response){

		var newvalues = { $set: {
				Category_Name 						: request.body.name,
				Category_Description 				: request.body.desc,
				Category_MetaTitle 					: request.body.meta_title,
				Category_FocusKeyWord 				: request.body.focus_keyword,
				Category_KeyeordsList 				: request.body.keyeords_list,
				Category_FeaturedImage_Media_ID 	: request.body.featured_image_media_id,
				Category_URL 						: request.body.url,
				Category_ParentCategory_Category_ID : request.body.parent_category,
				Category_IsActive 					: request.body.status,
			} };

		var myquery = { Category_Code: request.body.row_id }; 


		Categories.findOneAndUpdate( myquery,newvalues, function(err, field) {
    	    if (err){
    	    	return response.send({
					// user : request.user ,
					message: 'Error'
				});
    	    }
            if (!field) {
            	return response.send({
					// user : request.user ,
					message: 'Category not exists'
				});
            } else {

                return response.send({
					message: true
				});
			}
		})
	});
	

	app.get('/getActiveCategories', function(request, response) {
		Categories.find({Category_IsActive:1}, function(err, field) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (field) {
	        	
	            response.send(field);
	        } 
    	});
	});

    
  
};
function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
