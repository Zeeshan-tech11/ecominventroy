import path from "path";
import ProductModel from "../model/product.model.js";

export default class ProductController {
  getProduct(req, res) {
    const products = ProductModel.get();
    console.log("product", products);
    res.render("products", { products });
  }
  addProduct(req, res) {
    res.render("new-peoduct", {});
  }
  addNewProduct(req, res) {
    ProductModel.add(req.body);
    const products = ProductModel.get();
    res.render("products", { products });
  }
}
