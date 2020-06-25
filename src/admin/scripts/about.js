export default function adminPanelAbout(url) {

  function aboutGetAll() {
    fetch(url + "about/get")
      .then(response => response.json())
      .then(data => {
        document.getElementById('about-editor').value = data[0].value;
      });
  }

  function aboutUpdate() {
    let req = {
      text: document.getElementById('about-editor').value
    }
    fetch(url + 'about/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    });
  }

  document.getElementById('about-update').addEventListener('click', (event) => {
    aboutUpdate();
    event.preventDefault();
  });

  aboutGetAll();
}