const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/users-model')
const mongoose = require('mongoose')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"61008806125-mh1bru4dlqbls9uqdvlv301rupbt75e2.apps.googleusercontent.com",
        clientSecret:"XKSWOcq0dCrpHvftRt_0PhAj",
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback   : true
    },
    async function(request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      // User.findOrCreate({ email: profile.email }, function (err, user) {
      //   return done(err, user);
      // });
      // return done(null, profile);
      const newUser = {
        
        // firstName: profile.name.givenName,
        // lastName: profile.name.familyName,
        // image: profile.photos[0].value,
        // email: profile.emails[0].value
        firstname: profile.given_name,
        lastname: profile.family_name,
        email: profile.email,
      }
      try {
        //find the user in our database 
        let user = await User.findOne({ email: profile.email })

        if (user) {
          //If user present in our database.
          done(null, user)
        } else {
          // if user is not preset in our database save user data to database.
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }
));

