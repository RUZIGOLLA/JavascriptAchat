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
      varproducts=""
      panier.getTotal()
      $('#total').html(panier.total)
      $('#panierList').html('');
      panier.products.forEach((product)=>{
        let stringToAdd = this.productInPanierString
        //stringToAdd=stringToAdd.replace('<divclass="badgebadge-pillbadge-danger">${name}</div>',product.name)
        //stringToAdd=stringToAdd.replace('${quantity}',product.quantity)
        //products+=stringToAdd
        $('#panierList').append(`
        <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.price *product.quantity}€</td>
        <td onclick="removeFromBasket(${product.id})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></td>
        </tr>
        `
        )
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
        <button type="button" onclick="removeFromBasket(${listProduit[i].id})">Delete</button>
        </div>
        </div>
      </div>`)
    }
  }

})