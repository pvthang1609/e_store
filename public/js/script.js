class Product {
    constructor(id) {
        this.id = id;
    }
}

class Cart {
    constructor() {
        this.listItem = [];
    }

    getItems() {
        return this.listItem;
    }

    addItem(product) {
        this.listItem.push(product);
        this.updateCount();
    }

    deleteItem(product_id) {
        // find index
    }

    paymentForCart() {
        // redirect to ...
    }

    updateCount() {
        $("#cart_count").text(this.listItem.length);
    }

    rerenderUi() {}
}

class WebApp {
    constructor() {}
}

window.onload = function () {
    const cart = new Cart();

    $(".btn_add_cart").on("click", function () {
        const productId = $(this).data("product_id");
        cart.addItem(new Product(productId));
    });

    $(".btn_check_cart").on("click", function () {
        const listItem = cart.getItems();
        console.log(listItem);
    });
};

console.log("load script.js");
