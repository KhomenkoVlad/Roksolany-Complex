export const contacts = url => () => {

  function emailCleanAllInputs() {
    document.getElementById('your-name').value = '';
    document.getElementById('your-email').value = '';
    document.getElementById('your-subject').value = '';
    document.getElementById('your-message').value = '';
  }

  function emailSendEmail() {
    let text = document.getElementById('your-message').value + '\n\nЗ повагою, ' + 
    document.getElementById('your-name').value + ' (' + document.getElementById('your-email').value + ')';
    let req = {
      name: document.getElementById('your-name').value,
      subject: document.getElementById('your-subject').value,
      text: text,
    };
    fetch(url + 'email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    });
  }

  window.addEventListener('load', () => {
    document.getElementById('submit-message').addEventListener('click', event => {
      if (document.getElementById('your-name').validity.valid && document.getElementById('your-email').validity.valid && 
      document.getElementById('your-subject').validity.valid && document.getElementById('your-message').validity.valid) {
        emailSendEmail();
        emailCleanAllInputs()
      }
      event.preventDefault();
    });
  });
}
