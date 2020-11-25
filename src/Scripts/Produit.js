class Produit {

    constructor(
        name,
        description,
        image,
        price
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = 0;
    }

    AddQuantity(quantity) {
        let newQuantity = this.quantity + quantity;
        this.quantity = newQuantity > 9 ? 9 : newQuantity;
    }

    RemoveQuantity() {
        this.quantity = 0;
    }

}