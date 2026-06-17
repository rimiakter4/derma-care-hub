
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    // BUYER এবং ADMIN এর সাথে SUSPENDED যোগ করা হয়েছে
    enum: ["BUYER", "ADMIN", "SUSPENDED"], 
    default: "BUYER" 
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);