import mongoose from "mongoose";

const categorieSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter categorie name"],
        maxlength: [100, "Categorie name cannot exceed 100 characters"],
    },
    image: {
        type: String,
    },
});

const Categories = mongoose.model("categories", categorieSchema);
export default Categories;
