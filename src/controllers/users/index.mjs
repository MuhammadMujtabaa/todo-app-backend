import { UserModel } from "../../models/users/index.mjs"

export const getAllUsers = async (req, res) => {
    try {
        const data = await UserModel.find() || []
        res.send({
            status: "success",
            statusCode: 200,
            message: "all users",
            data: data?.map((item) => {
                const { _id, name, email, createdAt } = item;
                return {
                    _id, name, email, createdAt
                }
            })
        })
    } catch (error) {
        res.status(500).send({ message: "internal server error!" });
    }
}


export const getUserById = async (req, res) => {
    try {
        const param = req?.params?.id;
        const data = await UserModel.findById(param)
        res.send({
            status: "success",
            statusCode: 200,
            message: "user",
            data
        })
    } catch (error) {
        res.status(500).send({ message: "internal server error!" });
    }
}


export const deleteUserById = async (req, res) => {
    try {
        const param = req?.params?.id;
        const data = await UserModel.findByIdAndDelete(param)
        if (data) {
            res.send({
                status: "success",
                statusCode: 200,
                message: "user deleted successfully",
            })
        } else {
            res.status(400).send({
                status: "error",
                statusCode: 400,
                message: "no user found!",
            });
        }
    } catch (error) {
        console.log("error",error)
        res.status(500).send({ message: "internal server error!" });
    }
}