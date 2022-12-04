import Categories from "../models/CategoryModel.js";

class CategoryController {
    async getCategory(req, res) {
        try {
        const categories = await Categories.find();
        return res.status(200).json({
            status: 200,
            success: true,
            count: categories.length,
            data: categories,
        });
        } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
        }
    }
    
    async createCategory(req, res) {
        const { name } = req.body;
        try {
        const category = await Categories.findOne({
            name,
        });
        if (category) {
            return res.status(400).json({
            status: 400,
            success: false,
            message: "Categorie already exists",
            });
        }
        const result = new Categories({
            name,
        });
        await result.save();
        return res.status(201).json({
            status: 201,
            success: true,
            data: result,
        });
        }
        catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
        }
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
        const category = await Categories.findById(id);
        if (!category) {
            return res.status(404).json({
            status: 404,
            success: false,
            message: `Category with id ${id} not found`,
            });
        }
        category.name = name;
        await category.save();
        return res.status(200).json({
            status: 200,
            success: true,
            data: category,
        });
        } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;
        try {
        const category = await Categories.findById(id);
        if (!category) {
            return res.status(404).json({
            status: 404,
            success: false,
            message: "Category not found",
            });
        }
        await category.remove();
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Category deleted",
        });
        } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
        }
    }
}

export default new CategoryController();
