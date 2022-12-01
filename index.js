import express from "express";
import dotenv from "dotenv";
import connectDB from "./database.js";
import cors from "cors";
import upload from "./Server/middlewares/upload.js";
import User from "./Server/Routes/UserRoute.js";
import Item from "./Server/Routes/ItemRoute.js";
import Categorie from "./Server/Routes/CategorieRoute.js";


const app = express();
dotenv.config();
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('API is healthy...')
})

app.use("/api/users", User);
app.use("/api/items", upload.single("image"), Item);
app.use("/api/categories", upload.single("image"), Categorie);
// app.use("/api/items", Item);


app.use("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Page Not Found! Please enter a valid URL to proceed",
    });
  });