const url = new URL("http://localhost:8080/");

function adminLogin() {
    fetch(url + "check-login")
        .then(response => response.json())
        .then(data => {
            if(data && document.location.pathname !== '/admin/'){
                document.location.assign('/admin/');
            }
        });
}
adminLogin();