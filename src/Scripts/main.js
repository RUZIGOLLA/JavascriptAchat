$(document).ready(() => {
  $.getScript('Scripts/Produit.js', () => {
    $.getScript('Scripts/Panier.js', () => {
      $.getScript('Data/Catalogue1.js', () => {
        $.get('productInPanier.html', async (productInPanierString) => {
          $('[data-toggle="popover"]').popover()
          $('#site-search').on('input', e => searchInCatalog($('#site-search')[0].value))
          this.constlistProduit = []
          this.listProduit = []
          let id = 1
          catalog.forEach(product => {
            listProduit.push(new Produit(id, product.name, product.description, product.image, parseFloat(product.price, 10)))
            constlistProduit.push(new Produit(id, product.name, product.description, product.image, parseFloat(product.price, 10)))

            id++;
          })
          populateHtml()
          this.productInPanierString = productInPanierString
          this.panier = new Panier()
          await animateHtml()

        })
      })
    })
  })
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function animateHtml() {
   let prdts = $(".produits")
   $(prdts).addClass("produit")
   // console.log(produits.length)
   for (let i = 0; i < prdts.length; i++) {
    console.log(prdts[i]);
      // $(prdts[i]).addClass("produit")
      await sleep(200).then(() => addLoad(prdts[i]))
   }
    }
    async function removeLoad(prdt) {
      $(prdt).removeClass('load')
    }
   async function addLoad(prdt) {
      $(prdt).addClass('load')
    }
  function RefreshPanier() {
      varproducts=""
      panier.getTotal()
      console.log(panier.total)
      $('#Total').html(panier.total)
      $('#panierList').html('');
      panier.products.forEach((product)=>{
        let stringToAdd = this.productInPanierString
        stringToAdd = listProduit.length > 0 ? stringToAdd.replace('${product.name}', product.name) : stringToAdd.replace('Aucun produit dans le panier', )
        stringToAdd = stringToAdd.replace('${product.price}', product.price)
        stringToAdd = stringToAdd.replace('${product.quantity}', product.quantity)
        stringToAdd = stringToAdd.replace('${product.id}', product.id)
        stringToAdd = stringToAdd.replace('${product.total}', product.price * product.quantity)
        $('#panierList').append(stringToAdd)
      })
  }

  buy = (id) => {
    let product = constlistProduit.find(product=>product.id==id)
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
    let product = constlistProduit.find(product => product.id === id)
    product.quantity = 0;
    panier.RemoveFromBasket(product);
    RefreshPanier();
  }
  searchInCatalog = async (searchString) => {
          listProduit = []
          constlistProduit.forEach(p => {
          console.log(p.name.toLowerCase() === searchString.toLowerCase(), p, searchString)
          if (p.name.toLowerCase().includes(searchString.toLowerCase()) === true) {
              listProduit.push(p);
          }

        })
   $(".produits").removeClass("produit")
   //  }
        //$()
        populateHtml();
        await animateHtml()
  }
  populateHtml = () => {
    $("#materiels").empty()

    if (listProduit.length == 0) {
      $("#materiels").append(`<div class="text-center"><h4> Aucun produit trouvé ...</h4></div>`)

    }
    for (let i = 0; i < listProduit.length; i++) {
      $("#materiels").append(`
      <div class="mx-3 my-2 produits px-0 shadow-lg card col-xs-6 col-sm-2">
        <div class="card-title text-center pt-1 mb-0">
            <h4 class="mb-0">${listProduit[i].name}</h4>
        </div>
        <div class="card-body imgs pt-0" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">
            <img src="${listProduit[i].image}" class="card-img-top">
        </div>
        <div class="card-footer px-1">
          <div>Prix : ${listProduit[i].price} €</div>
          <input id="${listProduit[i].id}-quantity" class="form-control" type="number" placeholder="Quantité" onchange="changeQuantity(this)"/>
          <button id="${listProduit[i].id}-buy" type="button" onclick="buy(${listProduit[i].id})" class="btn btn-outline-success btn-block mt-1 inactive" disabled>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </button>
      </div></div>`)
    }
  }

  changeQuantity = (element) => {
      if (element.value !== "0" && element.value !== "") {
          let buyButton = element.id.split('-')[0] + '-buy'
          $('#'+buyButton).removeClass('inactive');
          document.getElementById(buyButton).removeAttribute('disabled')
      } else {
          let buyButton = element.id.split('-')[0] + '-buy'
          $('#'+buyButton).addClass('inactive');
          document.getElementById(buyButton).setAttribute('disabled', 'disabled')
      }
  }

})
