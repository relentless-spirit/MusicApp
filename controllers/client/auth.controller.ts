import { Request, Response } from "express";
import User from "../../models/user.model";
import bcryptjs from "bcryptjs";
// import { generateTokenAndSetToken } from "../../utils/generateToken.util.js";
// import { ForgotPassword } from "../../models/Forgot-Password.model.js";
// import { generateRandomString } from "../../helpers/generateNumber.helper.js";
// import { sendMail } from "../../helpers/sendMail.helper.js";
export async function login(req: Request, res: Response) {}
export async function loginPost(req: Request, res: Response) {
  //   try {
  //     const { email, password } = req.body;
  //     if (!email || !password) {
  //       return res
  //         .status(400)
  //         .json({ code: 400, message: "Email and password are required" });
  //     }
  //     const user = await TaiKhoan.findOne({ email: email });
  //     if (!user) {
  //       return res.status(400).json({ code: 400, message: "User not found" });
  //     }
  //     const isPasswordMatch = await bcryptjs.compare(password, user.password);
  //     if (!isPasswordMatch) {
  //       return res.status(400).json({ code: 400, message: "Invalid password" });
  //     }
  //     generateTokenAndSetToken(user._id, res); //jwt
  //     res.status(201).json({
  //       code: 201,
  //       message: "Logged in successfully",
  //       user: user,
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       code: 400,
  //       message: "Internal server error",
  //     });
  //   }
}
// export async function signup(req:Request, res:Response) {
//   try {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         code: 400,
//         message: "All fields are required",
//       });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Password must be at least 6 characters" });
//     }
//     const existingUserByEmail = await TaiKhoan.findOne({
//       email: email,
//     });
//     const existingUserByUsername = await TaiKhoan.findOne({
//       username: username,
//     });
//     if (existingUserByEmail) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Email already exists" });
//     }
//     if (existingUserByUsername) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Username already exists" });
//     }
//     const salt = bcryptjs.genSaltSync(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);
//     // console.log(salt);
//     // console.log(hashedPassword);
//     const newUser = new TaiKhoan({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     if (newUser) {
//       generateTokenAndSetToken(newUser._id, res); //jwt
//       await newUser.save();
//       res.status(201).json({ code: 201, message: "User created successfully" });
//     } else {
//       res.status(400).json({ code: 400, message: "Failed to create user" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(400)
//       .json({ code: 400, message: "Internal server error" });
//   }
// }

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
