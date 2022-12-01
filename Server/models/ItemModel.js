import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter item name"],
    maxlength: [100, "Item name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    maxlength: [5, "Item price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
    },
});
const Items = mongoose.model("items", itemSchema);
export default Items;
