export default function adminPanelFooter(url) {

  function footerGetAll() {
    fetch(url + "footer/all")
      .then(response => response.json())
      .then(data => {
        document.getElementById('footer-email').value = data[0].value;
        document.getElementById('footer-phone').value = data[1].value;
        document.getElementById('footer-adress').value = data[2].value;
      });
  }

  function footerUpdate() {
    let req = {
      email: document.getElementById('footer-email').value,
      phone: document.getElementById('footer-phone').value,
      adress: document.getElementById('footer-adress').value
    }
    fetch(url + 'footer/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    });
  }

  document.getElementById('footer-update').addEventListener('click', (event) => {
    footerUpdate();
    event.preventDefault();
  });

  footerGetAll();
}