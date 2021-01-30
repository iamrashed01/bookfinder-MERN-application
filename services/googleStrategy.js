const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../model/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.callbackURL,
  passReqToCallback: true,
},
(async (request, accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.email });
  if (user) {
    return done(null, user);
  }
  user = await new User({
    email: profile.email,
    name: profile.displayName,
    provider: profile.provider,
    picture: profile.picture,
  });
  await user.save();
  return done(null, user);
})));
