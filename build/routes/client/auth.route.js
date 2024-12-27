import express from "express";
const router = express.Router();
import passport from "passport";
import * as controller from "../../controllers/client/auth.controller.js";
import { authSignUp } from "../../middlewares/client/auth.middleware.js";
import { googleConfig } from "../../config/OAUTH2/google.config.js";
import { generateTokenAndSetToken } from "../../helpers/JWT.helper.js";
googleConfig();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    if (req.user) {
      generateTokenAndSetToken(req.user._id.toString(), res);
      TODO: res.send(`
      <script>
        window.location.href = "/";
      </script>
    `);
    }
  }
);
router.get("/login", controller.login);
router.get("/sign-up", controller.signup);
router.post("/sign-up", authSignUp, controller.signupPost);
router.post("/login", controller.loginPost);
router.post("/logout", controller.logout);
export default router;
