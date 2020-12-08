class Panier {
    constructor() {
        this.produits = [];
        this.total = 0;
    }

    AddToPanier(produit) {
        let produitIndex = this.produits.findIndex(prdt => prdt.id = produit.id)
        if (produitIndex !== -1) {
            this.produits[produitIndex] = produit
        } else {
            this.produits.push(produit)
        }
    }

    DeleteFromPanier(produit) {
        let prd = this.produits.find(p => p.id === produit.id)
        this.produits.splice(prd, 0);
    }

    getTotal() {
        this.produits.forEach(p => {
                this.total += p.prix
            }
        )
    }
}