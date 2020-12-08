$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.getScript('Data/Catalogue1.js', () => {
        $.get('productInPanier.html', (productInPanierString) => {

          this.listProduit = catalog;
          populateHtml()
          this.productInPanierString = productInPanierString
          this.panier = new Panier()

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

  buy = (id) => {
    let product = listProduit.find(product => product.id == id)
    console.log(product)
    panier.AddToPanier(product)
    RefreshPanier()
  }

  populateHtml = () => {
    for (let i = 0; i < catalog.length; i++) {
      $(".materiels").append(`
      <div class="d-inline mx-2 card my-2 col-2 " >
      <div class="card-title">
      ${catalog[i].name}
        </div>
        <div class="card-body">
        <div>Prix : ${catalog[i].prix}</div>
        </div>
        <div class="card-footer px-1">
        <div class="row mx-auto">
        <input class="col-4 form-control" value="${catalog[i].nombre}}" type="number" placeholder="Nombre"/>
        <button type="button" onclick="buy(${catalog[i].id})" class="col-6 btn btn-outline-danger">
          Add To Bag
        </button>
        </div>
        </div>
      </div>`)
    }
  }

})