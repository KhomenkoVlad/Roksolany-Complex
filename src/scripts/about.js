export const about = url => () => {

  function aboutGet() {
    fetch(url + 'about/get')
      .then(response => response.json())
      .then(data => {
        document.getElementById('about-text').innerHTML = data[0].value;
      });
  }

  aboutGet();
}