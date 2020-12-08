$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.get('productInPanier.html', (productInPanierString) => {

        this.productInPanierString = productInPanierString
        this.panier = new Panier()

        $.ajax({
          url: "./Data/Catalogue1.js",
          success: function (data){
            console.log(data)
          }
        })

        $(document).on('click', '.AddInPanier', (event) => {
          let id = event.target.id
          let product = listProduit.find(product => product.id = id)
          panier.AddToPanier(product)
          RefreshPanier()
        })

      })
    })
  })

  function RefreshPanier() {
    var products = ""
    this.panier.produits.forEach((product) => {
      let stringToAdd = this.productInPanierString
      stringToAdd = stringToAdd.replace('${name}', product.name)
      stringToAdd = stringToAdd.replace('${quantity}', product.quantity)
      products += stringToAdd
    })
    $('#panierList').html(products)
  }

})
