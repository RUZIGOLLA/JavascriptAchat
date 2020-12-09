class Panier {
    constructor() {
        this.products = [];
        this.total = 0;
    }

    AddToBasket(product) {
        let productIndex = this.products.findIndex(listProduct => listProduct.id === product.id)
        if (productIndex !== -1) {
            this.products[productIndex] = product
        } else {
            this.products.push(product)
        }
    }

    RemoveFromBasket(product) {
        let prd = this.products.findIndex(p => p.id === product.id)
        this.products.splice(prd, 1);
    }

    getTotal() {
        this.products.forEach(p => {
                this.total += p.prix
            }
        )
    }
}