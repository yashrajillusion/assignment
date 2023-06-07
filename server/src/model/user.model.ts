import mongoose, { Schema, Document } from "mongoose";
const bcrypt = require("bcrypt");

interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

const userSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
  },
  {
    timestaps: true,
    versionKey: false,
  }
);
userSchema.pre("save", function (this: User, next) {
  if (!this.isModified("password")) return next();
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
