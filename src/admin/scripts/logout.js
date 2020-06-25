export default function logout(url) {
  function adminLogout() {
    document.getElementById('admin-exit').addEventListener('click', () => {
      fetch(url + "logout")
        .then(() => document.location.assign('login.html'))
    })
  }
  adminLogout();

  function adminLogin() {
    fetch(url + "check-login")
      .then(response => response.json())
      .then(data => {
        if (data && document.location.pathname !== '/admin/') {
          document.location.assign('/admin/');
        }
        if (!data) {
          document.location.assign('/admin/login.html');
        }
      });
  }
  adminLogin();
}