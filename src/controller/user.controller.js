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
    req.session.email = req.body.email;
    const products = ProductModel.get();
    res.redirect("product");
  }
  logout(req, res) {
    //destriy session
    req.session.destroy((err) => {
      if (err) {
        console.log("err in sessionn destroy");
      } else {
        res.redirect("/login");
      }
    });
  }
  homePage(req, res) {
    if (req.session.email) {
      res.redirect("/product");
    } else {
      res.redirect("/login");
    }
  }
}
