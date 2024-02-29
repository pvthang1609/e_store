const session = require("express-session");
const FileStore = require("session-file-store")(session);

const { ProductProduct, ResUsers, SaleOrder, IrAttachment } = require("../models");

const saltRounds = 10;
const fileStoreOptions = {
    path: "/home/thang/Downloads",
    ttl: 7200,
};

function getAvatar(record) {
    return record.ir_attachment ? "<img style='width:50px' src='/" + record.ir_attachment.fileName + "'/>" : "";
}

const userTreeView = [
    {
        label: "Ho",
        fieldName: "firstName",
    },
    {
        label: "Ten",
        fieldName: "lastName",
    },
    {
        label: "Ten dang nhap",
        fieldName: "login",
    },
    {
        label: "Anh dai dien",
        fieldName: false,
        funcGenData: getAvatar,
    },
    {
        label: "Ngay tao",
        fieldName: "createdAt",
    },
];

const productTreeView = [
    {
        label: "Ten",
        fieldName: "name",
    },
    {
        label: "Ma",
        fieldName: "code",
    },
    {
        label: "Gia",
        fieldName: "price",
    },
    {
        label: "Can nang",
        fieldName: "weight",
    },
];

const attachmentTreeView = [
    {
        label: "Ten truong",
        fieldName: "fieldName",
    },
    {
        label: "Ten goc",
        fieldName: "originalName",
    },
    {
        label: "Ten file",
        fieldName: "fileName",
    },
    {
        label: "Duong dan",
        fieldName: "path",
    },
    {
        label: "Kich thuoc",
        fieldName: "size",
    },
    {
        label: "Ten Model",
        fieldName: "resModel",
    },
    {
        label: "Id Model",
        fieldName: "resId",
    },
];

const MAPPER_MODEL = {
    user: {
        menuItem: "Nguoi dung",
        model: ResUsers,
        params: { include: IrAttachment },
        treeView: userTreeView,
    },
    product: {
        menuItem: "San pham",
        model: ProductProduct,
        params: {},
        treeView: productTreeView,
    },
    sale_order: {
        menuItem: "Don hang",
        model: SaleOrder,
        params: {},
    },
    attachment: {
        menuItem: "Tep",
        model: IrAttachment,
        params: {},
        treeView: attachmentTreeView,
    },
};

const store = new FileStore(fileStoreOptions);

module.exports = { saltRounds, fileStoreOptions, store, MAPPER_MODEL };
