const express = require("express");
const multer = require("multer");
const IrAttachment = require("../models/ir_attachment");

const router = express.Router();
const upload = multer({ dest: "/home/thang/Downloads/uploads/" });

router.post("/profile", upload.single("avatar"), function (req, res, next) {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;
    IrAttachment.create({
        fieldName: fieldname,
        originalName: originalname,
        encoding,
        mimetype,
        destination,
        fileName: filename,
        path,
        size,
    });
    res.send(req.file);
});

module.exports = router;
