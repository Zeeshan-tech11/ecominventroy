import ProductModel from "../model/product.model.js";
import UserModel from "../model/user.model.js";

export default class UserController {
  addUsers(req, res) {
    res.render("register", {});
  }
  getLogin(req, res) {
    res.render("login");
  }
  addNewUser(req, res) {
    UserModel.add(req.body);
    res.render("login");
  }
  postLogin(req, res) {
    const user = UserModel.isValidUser(req.body);
    if (!user) {
      return res.render("login");
    }
    const products = ProductModel.get();
    res.render("products", { products });
  }
}
