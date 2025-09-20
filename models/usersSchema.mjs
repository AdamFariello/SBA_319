import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
})
export default mongoose.model("Users", usersSchema);