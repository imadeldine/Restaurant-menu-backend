import User from "../Models/UserModel.js";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        status: 200,
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async getUserById(req, res) {
    let { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user)
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} not found`,
        });
      return res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async addUser(req, res) {
    const { name, email, phone, password, isAdmin } = req.body;
    if (!name || !email || !phone || !password || !isAdmin) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All info must be provided",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).send("User already exists");
      return;
    }

    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    try {
      const result = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        isAdmin: isAdmin,
      });
      return res.status(201).json({
        status: 201,
        success: true,
        _id: result.id,
        result,
        name: result.name,
        token: generateToken(result._id),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await Bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid Credentials. Please try again",
      });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Data must be provided",
      });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} does not exist`,
        });
      }
      const result = await user.updateOne({
        name,
        email,
        phone,
        password,
      });
      return res.status(200).json({
        status: 200,
        success: true,
        data: `User with id ${id} updated successfully`,
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

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} does not exist`,
        });
      }
      const result = await user.delete();
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with id ${id} deleted permanently`,
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
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const userController = new UserController();
export default userController;
