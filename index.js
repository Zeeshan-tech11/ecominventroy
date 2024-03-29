import path from "path";
import express from "express";
import ProductController from "./src/controller/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import { ValidateForm } from "./src/middlewares/validation.middleware.js";
import {
  UploadSingle,
  upload,
} from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controller/user.controller.js";
import { isAuthorized } from "./src/middlewares/auth.middleware.js";
import { getLastVisit } from "./src/middlewares/lastvist.middleware.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //not on every route
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "view"));
app.use(expressEjsLayouts);
app.use(express.static(path.join("src", "view")));
app.use(express.static(path.join("public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// app.use(getLastVisit);//not on every visit
const productController = new ProductController();
const userController = new UserController();
app.get("/product", isAuthorized, productController.getProduct);
app.get("/new", productController.addProduct);
app.post(
  "/product",
  getLastVisit,
  ValidateForm,
  productController.addNewProduct
);
// app.post(
//   "/add-photo",
//   upload.array("book-photo", 2),
//   productController.addAssets
// );
app.post("/add-photo", UploadSingle("book-photo"), productController.addAssets);
app.get("/register", userController.addUsers);
app.post("/register", userController.addNewUser);
app.get("/login", userController.getLogin);
app.post("/login", getLastVisit, userController.postLogin);
app.get("/logout", userController.logout);
app.get("/", getLastVisit, userController.homePage);
app.listen(3000, () => {
  console.log("server is running");
});
