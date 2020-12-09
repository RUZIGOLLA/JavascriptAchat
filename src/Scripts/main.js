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
    if (quantityToAdd > 0) {
      product.quantity = quantityToAdd + product.quantity > 10 ? 10 : quantityToAdd + product.quantity
      panier.AddToBasket(product)
      RefreshPanier()
    }
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
      <div class="d-inline mx-2 card my-2 col-2 px-0" >
        <div class="card-title text-center pt-1 mb-0">
            <h4 class="mb-0">${listProduit[i].name}</h4>
        </div>
        <div class="card-body pt-0">
            <img src="${listProduit[i].image}" class="card-img-top">
        </div>
        <div class="card-footer px-1">
          <div>Prix : ${listProduit[i].price} €</div>
          <input id="${listProduit[i].id}-quantity" class="form-control" type="number" placeholder="Quantité"/>
          <button type="button" onclick="buy(${listProduit[i].id})" class="btn btn-outline-success btn-block mt-1">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </button>
        </div>
      </div>`)
    }
  }

})