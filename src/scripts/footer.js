export const footer = url => () => {

  function footerGetAll() {
    fetch(url + 'footer/all')
      .then(response => response.json())
      .then(data => {
        document.getElementById('footer-email').innerHTML = data[0].value;
        document.getElementById('footer-phone').innerHTML = data[1].value;
        document.getElementById('footer-adress').innerHTML = data[2].value;
      });
  }

  footerGetAll();
}