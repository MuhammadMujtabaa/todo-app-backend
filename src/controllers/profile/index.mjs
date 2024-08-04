import { validationResult } from "express-validator";

export const getProfile = (req, res) => {
  res.json({ message: "Profile", data: req.user });
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  } else {
    res.json({ message: "Profile", data: req.user });
  }
};
