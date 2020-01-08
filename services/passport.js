const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: LocalStrategy } = require('passport-local');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne( {googleId: profile.id });
      console.log('profile', profile);

      if (existingUser){
         return done(null, existingUser);
      }

      const user = await new User(
        {googleId: profile.id,
         fullName: profile.displayName,
         userImg: profile.photos[0].value,
         userEmail: profile.emails[0].value,
         firstName: profile.name.givenName,
         lastName: profile.name.familyName
       }).save();
      done(null, user);
    }
  )
);

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
   }
  )
);
