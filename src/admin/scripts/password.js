export default function password(url) {
  function editPasswordAndLogin() {
    let req = {
      login: document.getElementById('edit-login').value,
      pass: document.getElementById('edit-pass').value
    }
    fetch(url + 'password/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    })
    .then(() => {
      document.getElementById('edit-login').value = '';
      document.getElementById('edit-pass').value = '';
    });
  }
  document.getElementById('edit-button').addEventListener('click', (event) => {
    if (document.getElementById('edit-login').value && document.getElementById('edit-pass').value) {
      editPasswordAndLogin();
    }
    event.preventDefault();
  });
}