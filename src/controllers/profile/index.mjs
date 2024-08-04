import { matchedData, validationResult } from "express-validator";
import { uploadOnCloudinary } from "../../utils/cloudinary.mjs";
import { UserModel } from "../../models/users/index.mjs";

export const getProfile = (req, res) => {
  res.json({ message: "Profile", data: req.user });
};

export const updateProfile = async (req, res) => {
  // Extract validation errors
  const errors = validationResult(req);

  // If validation errors exist, respond with an error status and messages
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed!",
      errors: errors.array(),
    });
  }

  try {
    // Extract file path and user ID
    const avatarLocalPath = req.file?.path;
    const userId = req.user?._id;

    // Upload avatar to Cloudinary if it exists
    const avatar = avatarLocalPath ? await uploadOnCloudinary(avatarLocalPath) : null;

    // Prepare data to update
    const updateData = {
      ...matchedData(req),
      ...(avatar ? { avatar: avatar.url } : {}),
    };

    // Update user profile in the database
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    // Respond with the updated profile data
    res.json({
      message: "Profile has been updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    // Respond with appropriate error messages based on the type of error
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({
        message: "Validation Error",
        errors: errorMessages,
      });
    } else {
      res.status(500).json({
        message: "Internal server error!",
      });
    }
  }
};
