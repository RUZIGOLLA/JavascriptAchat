
export class Panier {
    constructor() {
        this.produits = [];
        this.total = 0;
    }

    AddToPanier(produit) {
        this.produits.Add(produit);        
    }

    DeleteFromPanier(produit) {
        let prd = this.produits.find(p => p === produit)
        this.produits.splice(prd, 0);
    }

    getTotal() {
        this.produits.forEach(p => {
                this.total += p.prix
            }
        )
    }
}