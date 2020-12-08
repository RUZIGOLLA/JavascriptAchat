$(document).ready(() => {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    $('#app').html(`<p>You have been here for ${seconds} seconds.</p>`)
  }, 1000);
})