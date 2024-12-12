import express from "express";
const router = express.Router();
import passport from "passport";
import * as controller from "../../controllers/client/auth.controller";
import { authSignUp } from "../../middlewares/client/auth.middleware";
import { googleConfig } from "../../config/OAUTH2/google.config";
import { generateTokenAndSetToken } from "../../helpers/JWT.helper";
import { authUserInMainPage } from "../../middlewares/client/auth.middleware";
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
  (req: express.Request, res: express.Response) => {
    if (req.user) {
      generateTokenAndSetToken((req.user as any)._id.toString(), res);
      // Gửi script thay vì redirect trực tiếp // redirect() + setToken => khong dong bo
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
