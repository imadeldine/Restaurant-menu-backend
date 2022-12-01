import Categories from "../models/CategorieModel.js";

class CategorieController {
    async getCategorie(req, res) {
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
    
    async createCategorie(req, res) {
        const { name } = req.body;
        try {
        const categorie = await Categories.findOne({
            name,
        });
        if (categorie) {
            return res.status(400).json({
            status: 400,
            success: false,
            message: "Categorie already exists",
            });
        }
        const result = new Categories({
            name,
        });
        if (req.file.length === 0) {
            return res.status(400).json({
            status: 400,
            success: false,
            message: "Please select an image to upload",
            });
        }
        result.image = req.file.path;
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

    async updateCategorie(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
        const categorie = await Categories.findById(id);
        if (!categorie) {
            return res.status(404).json({
            status: 404,
            success: false,
            message: `Categorie with id ${id} not found`,
            });
        }
        categorie.name = name;
        await categorie.save();
        return res.status(200).json({
            status: 200,
            success: true,
            data: categorie,
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

    async deleteCategorie(req, res) {
        const { id } = req.params;
        try {
        const categorie = await Categories.findById(id);
        if (!categorie) {
            return res.status(404).json({
            status: 404,
            success: false,
            message: "Categorie not found",
            });
        }
        await categorie.remove();
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Categorie deleted",
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

export default new CategorieController();
