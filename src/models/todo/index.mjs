import { model, Schema } from "mongoose";

const todo = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    dateAndTime: {
      type: Date,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const todoModel = model("Todo", todo);
