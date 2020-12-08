let panier;
console.log('okok')
// 'use strict';

function main() {
  let seconds = 0;
//   $.ajax({
//     url: "Scripts/",
//     data: {
//       zipcode: 97201
//     },
//     success: function( result ) {
//       $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
//     }
//   });
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

main();
