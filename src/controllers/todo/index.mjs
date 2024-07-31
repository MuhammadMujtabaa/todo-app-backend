import { matchedData, validationResult } from "express-validator";
import { todoModel } from "../../models/todo/index.mjs";

export const addTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed!", errors: errors.array() });
    }
    const userId = req?.user?._id;
    const data = { userId, ...matchedData(req) };

    const todo = new todoModel(data);
    await todo.save();
    res.json({ message: "todo has been added", data: todo });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation Error", errors });
    } else {
      res.status(500).json({ message: "Internal server error!" });
    }
  }
};

export const getTodo = async (req, res) => {
  const userId = req?.user?._id;
  console.log("userId", userId);
  try {
    const data = (await todoModel.find({ userId })) || [];
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "All Todo's",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching todo's:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user?._id;

    const data = await todoModel.findOne({
      _id,
      userId,
    });

    if (data) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Todo",
        data,
      });
    } else {
      res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.error("Error fetching Todo by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodoById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user?._id;

    const data = await todoModel.findOneAndDelete({
      userId,
      _id,
    });

    if (data) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Todo has been deleted",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.error("Error while deleting Todo by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user?._id;
    const errors = validationResult(req);

    const checkIfExist = await todoModel.findOneAndDelete({
      userId,
      _id,
    });

    if(checkIfExist) {
      const data = matchedData(req);
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json({ message: "Validation failed!", errors: errors.array() });
      }
      const responseData = await todoModel.findOneAndUpdate({
        _id,
        userId
      },data);
  
      res.json({ message: "todo has been updated", data: responseData });
    } else {
      res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Todo not found",
      });
    }


  } catch (error) {
    console.error("Signup error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation Error", errors });
    } else {
      res.status(500).json({ message: "Internal server error!" });
    }
  }
};
