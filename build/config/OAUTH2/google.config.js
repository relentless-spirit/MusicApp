var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../models/user.model.js";
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
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (_accessToken, _refreshToken, profile, done) =>
        __awaiter(void 0, void 0, void 0, function* () {
          try {
            const existingUser = yield User.findOne({
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
            yield newUser.save();
            return done(null, newUser);
          } catch (err) {
            return done(err);
          }
        })
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
