$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.getScript('Data/Catalogue1.js', () => {
        $.get('productInPanier.html', (productInPanierString) => {

          this.listProduit = catalog;
          populateHtml()
          this.productInPanierString = productInPanierString
          this.panier = new Panier()

          $(document).on('click', '.AddInPanier', (event) => {
            let id = event.target.id
            let product = listProduit.find(product => product.id == id)
            console.log(product)
            panier.AddToPanier(product)
            RefreshPanier()
          })

        })
      })
    })
  })

  function RefreshPanier() {
    var products = ""
    panier.produits.forEach((product) => {
      let stringToAdd = this.productInPanierString
      stringToAdd = stringToAdd.replace('${name}', product.name)
      stringToAdd = stringToAdd.replace('${quantity}', product.quantity)
      products += stringToAdd
    })
    $('#panierList').html(products)
  }

  populateHtml = () => {
    console.log(listProduit)
    for (let i = 0; i < catalog.length; i++) {
      $(".materiels").append(`
      <div class="d-inline mx-2 card my-2 col-2 " >
      <div class="card-title">
      ${catalog[i].name}
        </div>
        <div class="card-body">
        <div>Prix : ${catalog[i].prix}</div>
        </div>
        <div class="card-footer px-0">
        <button type="button" class="col btn btn-outline-danger">
          ok
        </button>
        </div>
    
      </div>`)
    }
    yes = (produit) => {
      console.log(produit)
    }
  }

})