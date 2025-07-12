import { Schema, model, models, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";
// ✅ Mongoose schema for DB (used to store in MongoDB)
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // prevent duplicates
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true } // optional: adds createdAt & updatedAt fields
);

// ✅ Hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});
// ✅ Prevent model overwrite in dev hot reload
export const User = models.User || model("User", UserSchema);
