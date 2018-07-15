
var LocalStrategy    = require('passport-local').Strategy;

var User       = require('../app/models/nono_cp_users');

module.exports = function(passport,res) {

    // Maintaining persistent login sessions
    // serialized  authenticated user to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

     passport.use('login', new LocalStrategy({
        usernameField : 'user_name',
        passReqToCallback : true 
    },
     function(req, userName, password, done) {
       process.nextTick(function() {
            User.findOne({ 'CP_User_Name' :  userName }, function(err, user,info) {
                if (err){ return done(err);}
                if (!user)
                  return done(null,false,{status:false,message:'user is not exist'});
                if (!user.verifyPassword(password))
                    return done(null,false,{status:false,message:'Enter correct password'});
               else
                    return done(null, user);
            });
        });

    }));


     passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        process.nextTick(function() {
        
            if (!req.user) {
                User.findOne({ 'email' :  email }, function(err, user) {
            	    if (err){ return res.status(500).send();}
                    if (user) {
                        return done(null, false, req.flash('signuperror', 'User already exists'));
                    } else {
                        var newUser            = new User();
			            newUser.username    = req.body.username;
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
            			newUser.name	= '' ; 
            			newUser.address	= '';
                        newUser.role = 'admin';   

                        newUser.save(); 
                            return done(null, newUser);
                        }
                        });
                    }

        });


    }));



};
