const listProduit = {  
  liste : [],
 
};

$.ajax({
  url: "./Data/Catalogue1.js",
  success: function (data){
    listProduit.liste = data;

   populateHtml()
    // console.log(data)
  }
})

populateHtml = () => {
  console.log(catalog)
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
    <button type="button" onclick="yes(${catalog[i].id})" class="col-6 btn btn-outline-danger">
      Add To Bag
    </button>
    </div>
    </div>
  </div>`)
} 
 yes = (produit) => {
  console.log(produit)
 }
}
