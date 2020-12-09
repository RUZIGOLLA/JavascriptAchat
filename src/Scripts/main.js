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
        <tdonclick="del(${product.id})"><svgwidth="1em"height="1em"viewBox="001616"class="bibi-trash"fill="currentColor"xmlns="http://www.w3.org/2000/svg">
        <pathd="M5.55.5A.5.500166v6a.5.5001-10V6a.5.5001.5-.5zm2.50a.5.5001.5.5v6a.5.5001-10V6a.5.5001.5-.5zm3.5a.5.5000-10v6a.5.500010V6z"/>
        <pathfill-rule="evenodd"d="M14.53a11001-11H13v9a22001-22H5a22001-2-2V4h-.5a11001-1-1V2a110011-1H6a110011-1h2a1100111h3.5a1100111v1zM4.1184L44.059V13a1100011h6a110001-1V4.059L11.8824H4.118zM2.53V2h11v1h-11z"/>
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