import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../models/user.model";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const googleConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://musicapp-fhfy.onrender.com/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({
            email: profile.emails ? profile.emails[0].value : "",
            deleted: false,
            status: "active",
          });

          if (existingUser) {
            return done(null, existingUser);
          }

          const newUser = new User({
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            avatar: profile.photos ? profile.photos[0].value : "",
            deleted: false,
            status: "active",
          });

          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: Express.User, done) {
    done(null, user);
  });
};
