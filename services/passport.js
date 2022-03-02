const passport = require('passport');
const keys = require('../config/keys.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user, done) => { 
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => { 
        done(null, user)
    })
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: 'true'
}, async (accessToken, refreshToken, profile, done) => {

    /**
     * thenable...
     * https://mongoosejs.com/docs/promises.html#built-in-promises
     */
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) {
       return done(null, existingUser);
    } 

    const savedUser = await new User({
        googleId: profile.id
    }).save();
    done(null, savedUser);
 })
);