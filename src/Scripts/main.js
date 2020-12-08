$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.getScript('Data/Catalogue1.js', () => {
        $.get('productInPanier.html', (productInPanierString) => {

          this.listProduit = []
          let id = 1
          catalog.forEach(product => {
            listProduit.push(new Produit(id, product.name, product.description, product.image, product.price))
            id++;
          })
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
    let product = listProduit.find(product => product.id === id)
    panier.AddToPanier(product)
    RefreshPanier()
  }

  populateHtml = () => {
    for (let i = 0; i < listProduit.length; i++) {
      $(".materiels").append(`
      <div class="d-inline mx-2 card my-2 col-2 " >
      <div class="card-title">
      ${listProduit[i].name}
        </div>
        <div class="card-body">
        <div>Prix : ${listProduit[i].price}</div>
        </div>
        <div class="card-footer px-1">
        <div class="row mx-auto">
        <input class="col-5 form-control" type="number" placeholder="Quantité"/>
        <button type="button" onclick="buy(${listProduit[i].id})" class="col-6 btn btn-outline-danger">
          Add To Bag
        </button>
        </div>
        </div>
      </div>`)
    }
  }

})