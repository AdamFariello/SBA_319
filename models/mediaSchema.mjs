import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    id: {type: String, required: true},
    pizzaID: {type: String, required: true},
    userSubmitID: {type: String, required: true},
    appetizingScore: {type: Number, required: true}
});
export default mongoose.model("Media", mediaSchema);