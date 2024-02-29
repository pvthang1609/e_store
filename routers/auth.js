const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { saltRounds, store } = require("../util");
const { ResUsers, IrAttachment } = require("../models");
const router = express.Router();
const upload = multer({ dest: "/home/thang/Downloads/uploads/" });

router.post("/register", upload.single("avatar"), async (req, res, next) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;
    const attachmentId = await IrAttachment.create({
        fieldName: fieldname,
        originalName: originalname,
        encoding,
        mimetype,
        destination,
        fileName: filename,
        path,
        size,
    });

    const { login } = req.body;
    const exitsUserId = await ResUsers.findOne({
        where: {
            login,
        },
    });

    if (exitsUserId) {
        res.send("Tai khoan da ton tai");
    } else {
        const { password, ...part } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        const userId = await ResUsers.create({ ...part, password: hash, isAdmin: false, attachmentId: attachmentId.id });
        attachmentId.resModel = "res_users";
        attachmentId.resId = userId.id;
        attachmentId.save();
        res.send(userId);
    }
});

router.post("/login", async (req, res, next) => {
    const { login, password } = req.body;
    const exitsUserId = await ResUsers.findOne({
        where: {
            login,
        },
    });
    if (!exitsUserId) {
        res.send("Tai khoan khong ton tai");
    } else {
        if (bcrypt.compareSync(password, exitsUserId.password)) {
            req.session.userId = exitsUserId.id;
            req.session.userName = exitsUserId.firstName + " " + exitsUserId.lastName;
            req.session.isAdmin = exitsUserId.isAdmin;
            if (exitsUserId.isAdmin) {
                res.redirect("/admin");
            } else {
                res.redirect("/");
            }
        } else {
            res.send("Mat khau khong chinh xac");
        }
    }
});

router.get("/logout", async (req, res, next) => {
    if (req.session.userId) {
        store.destroy(req.sessionID, (err) => {
            if (!err) {
                res.clearCookie();
            }
        });
    }
});

module.exports = router;
