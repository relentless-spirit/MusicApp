import { Request, Response } from "express";
import User from "../../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetToken } from "../../helpers/JWT.helper";
// import { ForgotPassword } from "../../models/Forgot-Password.model.js";
// import { generateRandomString } from "../../helpers/generateNumber.helper.js";
// import { sendMail } from "../../helpers/sendMail.helper.js";
export async function login(req: Request, res: Response) {
  res.render("client/pages/auth/login.pug");
}
export async function signup(req: Request, res: Response) {
  res.render("client/pages/auth/sign-up.pug");
}
export async function loginPost(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.redirect("back");
      return;
    }
    const user = await User.findOne({
      username: username,
      deleted: false,
      status: "active",
    });
    if (!user) {
      res.redirect("back");
      return;
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      res.redirect("back");
      return;
    }
    generateTokenAndSetToken(user._id.toString(), res); //jwt
    res.redirect("/");
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Internal server error",
    });
  }
}
export async function signupPost(req: Request, res: Response) {
  try {
    const { username, email, password, rePassword } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSetToken(newUser._id.toString(), res); //jwt
      await newUser.save();
    } else {
      res.redirect("back");
      return;
    }
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
  }
}

// export async function logout(req:Request, res:Response) {
//   try {
//     res.clearCookie("jwt-token");
//     res.status(201).json({ code: 201, message: "Logged out successfully" });
//   } catch (error) {
//     res.status(400).json({ code: 400, message: "Internal server error" });
//   }
// }
// export async function forgotPost(req:Request, res:Response) {
//   try {
//     const existedUser = await TaiKhoan.findOne({
//       email: req.body.email,
//       deleted: false,
//       status: "active",
//     });
//     if (!existedUser) {
//       return res.status(400).json({ code: 400, message: "User not found" });
//     }
//     const existedEmailInForgotPassword = await ForgotPassword.findOne({
//       email: req.body.email,
//     });
//     if (!existedEmailInForgotPassword) {
//       const dataInfo = {
//         email: req.body.email,
//         otp: generateRandomString(6),
//         expireAt: Date.now() + 3 * 60 * 1000, //3 mins expire
//       };
//       const newForgot = new ForgotPassword(dataInfo);
//       await newForgot.save();
//       const subject = "Xác thực mã OTP";
//       const text = `Mã xác thực của bạn là <b>${dataInfo.otp}</b>. Mã OTP có hiệu lực trong vòng 3 phút, vui lòng không cung cấp mã OTP cho bất kỳ ai.`;
//       sendMail(dataInfo.email, subject, text);
//     }
//     res.status(201).json({
//       code: 201,
//       email: req.body.email,
//       message: "OTP sent successfully. And only sent 1 time per 3 mins",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ code: 400, message: "Internal server error" });
//   }
// }
// export async function sendOtpPost(req:Request, res:Response) {
//   try {
//     const existedUserInForgotPassword = await ForgotPassword.findOne({
//       email: req.body.email,
//       otp: req.body.otp,
//     });
//     if (!existedUserInForgotPassword) {
//       return res.status(400).json({
//         code: 400,
//         message: "OTP is invalid or being expired ! Let try again !",
//       });
//     }
//     const user = await TaiKhoan.findOne({
//       email: req.body.email,
//       deleted: false,
//       status: "active",
//     });
//     generateTokenAndSetToken(user._id, res); //jwt
//     res
//       .status(201)
//       .json({ code: 201, message: "OTP is valid ! Let reset password !" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ code: 400, message: "Internal server error" });
//   }
// }
// export async function resetPassword(req:Request, res:Response) {
//   try {
//     const salt = bcryptjs.genSaltSync(10);
//     const hashedPassword = await bcryptjs.hash(req.body.newPassword, salt);
//     console.log(req.user);
//     await TaiKhoan.updateOne(
//       {
//         _id: req.user._id,
//       },
//       {
//         password: hashedPassword,
//       }
//     );
//     res.status(201).json({ code: 201, message: "Password reset successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ code: 400, message: "Internal server error" });
//   }
// }
