import path from "path";
import express from "express";
import ProductController from "./src/controller/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "view"));
app.use(expressEjsLayouts);
const productController = new ProductController();
app.get("/", productController.getProduct);
app.get("/new", productController.addProduct);
app.post("/", productController.addNewProduct);
app.use(express.static(path.join("src", "view")));
app.listen(3000, () => {
  console.log("server is running");
});
