import mongoose from "mongoose";

const pizzaSchema = new mongoose.schema ({
    pizzaName: {type: String, required: true},
    pizzaLink: {type: String, required: false}
});

export default mongoose.Model("PizzaType", pizzaSchema);