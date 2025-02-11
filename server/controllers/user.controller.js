import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "All input is required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists!", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, name });
    return res
      .status(201)
      .json({ message: "User created successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to register", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All input is required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
    generateToken(user, res, `Login successfully! ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login", success: false });
  }
};
export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logout successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to logout", success: false });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile Not found",
        success: false,
      });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to load user", success: false });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    //extract public id of the old image from the url is it exists
    if (user.photoUrl) {
      const publicId = user.photourl.split("/").pop().split(".")[0];
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const { photoUrl } = cloudResponse.secure_url;
    const updatedData = { name, photoUrl };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    return (
      res.status(200),
      json({
        user: updatedUser,
        success: true,
        message: "Profile updated successfully!",
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to update profile", success: false });
  }
};
