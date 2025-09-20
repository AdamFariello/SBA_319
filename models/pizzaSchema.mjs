import mongoose from "mongoose";

const pizzaSchema = new mongoose.schema ({
    id: {type: String, required: true},
    pizzaName: {type: String, required: true},
    recipe: {type: String, required: true},
    recipeLink: {type: String, required: false}
});

export default mongoose.Model("PizzaType", pizzaSchema);