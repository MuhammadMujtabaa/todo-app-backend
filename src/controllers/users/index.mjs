import { UserModel } from "../../models/users/index.mjs";

export const getAllUsers = async (req, res) => {
    try {
        const data = await UserModel.find().select("-password") || [];
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "All users",
            data: data
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await UserModel.findById(userId);

        if (data) {
            res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "User",
                data
            });
        } else {
            res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await UserModel.findByIdAndDelete(userId);

        if (data) {
            res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "User deleted successfully"
            });
        } else {
            res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
