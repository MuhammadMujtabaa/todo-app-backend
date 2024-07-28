import { model, Schema } from "mongoose";

const token = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    token: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 3600), // 60 seconds from now
    },
  },
  { timestamps: true }
);

token.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const tokenModel = model("Token", token);
