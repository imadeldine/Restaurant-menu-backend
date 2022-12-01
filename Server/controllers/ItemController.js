import Items from "../models/ItemModel.js";

class ItemController {
  async getItem(req, res) {
    try {
      const items = await Items.find().populate("category");
      return res.status(200).json({
        status: 200,
        success: true,
        count: items.length,
        data: items,
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

  async createItem(req, res) {
    const { name, price, description, category } = req.body;
    try {
      const item = await Items.findOne({ name });
      if (item) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Item already exists",
        });
      }
      const result = new Items({
        name,
        price,
        description,
        category,
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async updateItem(req, res) {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    try {
      const item = await Items.findByIdAndUpdate(
        id,
        {
          name,
          price,
          description,
            category,
        },
        { new: true }
      );
      if (!item) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Item not found",
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        data: item,
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

  async deleteItem(req, res) {
    const { id } = req.params;
    try {
      const item = await Items.findByIdAndDelete(id);
      if (!item) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Item not found",
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Item deleted",
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

export default new ItemController();
