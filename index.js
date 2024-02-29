const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

const saleOrderRouter = require("./routers/sale_order");
const userRouter = require("./routers/res_users");
const productRouter = require("./routers/product_product");
const solRouter = require("./routers/sale_order_line");
const authRouter = require("./routers/auth");
const uploadRouter = require("./routers/upload");

const { ProductProduct } = require("./models");
const { store, MAPPER_MODEL } = require("./util");

app.set("view engine", "pug");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-

// session
app.use(session({ store: store, secret: "keyboard cat" }));

// api
app.use("/api/v1/sale_order", saleOrderRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/sale_order_line", solRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);

app.use(express.static("public"));
app.use(express.static("/home/thang/Downloads/uploads"));

// views public
app.get("/", async (req, res) => {
    const listProduct = await ProductProduct.findAll();
    res.render("index", { title: "Hey", message: "Hello there!", data: listProduct });
});
app.get("/login", async (req, res) => {
    res.render("login");
});
app.get("/register", async (req, res) => {
    res.render("register");
});
app.get("/cart", async (req, res) => {
    res.render("cart");
});

// views admin
app.use("/admin", (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else if (!req.session.userId) {
        res.redirect("/login");
    } else {
        res.send("Ban khong co quyen Admin");
    }
});

app.get("/admin", async (req, res) => {
    res.render("admin");
});

app.get("/admin/:modelName", async (req, res) => {
    const { modelName } = req.params;
    const modelObject = MAPPER_MODEL[modelName].model;
    const defaultParams = MAPPER_MODEL[modelName].params;
    const treeView = MAPPER_MODEL[modelName].treeView;
    const menuItem = MAPPER_MODEL[modelName].menuItem;

    const records = await modelObject.findAll(defaultParams);
    res.render("admin_master_data", { listItems: records, modelName, treeView, menuItem });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
