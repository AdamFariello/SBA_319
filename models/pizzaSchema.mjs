import mongoose from "mongoose";

const pizzaSchema = new mongoose.schema ({
    pizzaName: {type: String, required: true},
    pizzaLink: {type: String, required: false}
});
pizzaSchema.index({pizzaName: 1});
export default mongoose.Model("PizzaType", pizzaSchema);