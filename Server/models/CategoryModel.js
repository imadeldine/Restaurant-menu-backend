import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter categorie name"],
        maxlength: [100, "Categorie name cannot exceed 100 characters"],
    },
    image: {
        type: String,
    },
});

const Categories = mongoose.model("categories", categorySchema);
export default Categories;
