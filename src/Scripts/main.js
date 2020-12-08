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
