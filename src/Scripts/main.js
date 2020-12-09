$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.getScript('Data/Catalogue1.js', () => {
        $.get('productInPanier.html', (productInPanierString) => {

          this.listProduit = []
          let id = 1
          catalog.forEach(product => {
            listProduit.push(new Produit(id, product.name, product.description, product.image, parseFloat(product.price, 10)))
            
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
      varproducts=""
      panier.getTotal()
      console.log(panier.total)
      $('#Total').html(panier.total)
      $('#panierList').html('');
      panier.products.forEach((product)=>{
        let stringToAdd = this.productInPanierString
        stringToAdd = stringToAdd.replace('${product.name}', product.name)
        stringToAdd = stringToAdd.replace('${product.price}', product.price)
        stringToAdd = stringToAdd.replace('${product.quantity}', product.quantity)
        stringToAdd = stringToAdd.replace('${product.id}', product.id)
        stringToAdd = stringToAdd.replace('${product.total}', product.price * product.quantity)
        $('#panierList').append(stringToAdd)
      })
  }
    
  buy = (id) => {
    let product = listProduit.find(product=>product.id==id)
    let quantityToAdd = parseInt($("#" + id + "-quantity").val())
    if (isNaN(quantityToAdd)) {
      quantityToAdd = 1;
    }
    product.quantity = quantityToAdd + product.quantity > 10 ? 10 : quantityToAdd + product.quantity
    panier.AddToBasket(product)
    RefreshPanier()
  }
      
  // buy = (id) => {
  //   let product = listProduit.find(product => product.id === id)
  //   panier.AddToBasket(product)
  //   RefreshPanier()
  // }

  removeFromBasket = (id) => {
    let product = listProduit.find(product => product.id === id)
    product.quantity = 0;
    panier.RemoveFromBasket(product);
    RefreshPanier();
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
        <input id="${listProduit[i].id}-quantity" class="col-5 form-control" type="number" placeholder="Quantité"/>
        <button type="button" onclick="buy(${listProduit[i].id})" class="col-6 btn btn-outline-danger">
          Add To Bag
        </button>
        </div>
        </div>
      </div>`)
    }
  }

})