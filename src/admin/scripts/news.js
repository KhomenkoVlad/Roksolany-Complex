const newsSelectElement = document.getElementById('news-selelct');
const newsID = document.getElementById('news-id');
const newsName = document.getElementById('news-name');
const newsImageLabel = document.getElementById('news-image-label');
const newsImageInput = document.getElementById('news-image-input');
const newsButtonUpdateOrCreate = document.getElementById('news-update-or-create');
const newsButtonDelete = document.getElementById('news-delete');
let newsPreviousNameImage;
let newsEditor;

export default function adminPanelNews(url) {

    ClassicEditor
        .create(document.querySelector('#news-ckeditor'))
        .then(newEditor => {
            newsEditor = newEditor;
        })
        .catch(error => {
            console.error(error);
        });

    function newsRefreshForm() {
        newsGetAllRecords();
        newsButtonUpdateOrCreate.innerHTML = 'Додати';
        newsSelectElement.value = 'Новий запис'
        newsID.value = '';
        newsName.value = '';
        newsImageInput.setAttribute('required', '');
        newsImageInput.value = null;
        newsImageLabel.innerHTML = 'Оберіть файл';
        newsEditor.setData('');
        newsPreviousNameImage = '';
    }

    function newsGetAllRecords() {
        fetch(url + "news/all")
            .then(response => response.json())
            .then(data => {
                let options = '<option selected class="form-control">Новий запис</option>';
                data.forEach(element => {
                    options += `
                <option value="${element.news_id}" class="form-control">${element.caption}</option>`;
                });
                newsSelectElement.innerHTML = options;
            });
    }

    function newsGetRecordById() {
        newsButtonUpdateOrCreate.innerHTML = "Оновити";
        newsImageInput.removeAttribute('required');
        let req = { id: newsSelectElement.value };
        fetch(url + 'news/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                newsID.value = data[0].news_id;
                newsName.value = data[0].caption;
                newsImageLabel.innerHTML = data[0].image;
                newsEditor.setData(data[0].text);
            });
    }

    function newsUpdateRecord() {
        if (newsName.value && newsEditor.getData() && newsImageLabel.innerHTML) {
            newsButtonUpdateOrCreate.innerHTML = "Додати";
            let resultnewsAddImage = newsAddImage();
            let req = {
                news_id: newsID.value,
                caption: newsName.value,
                image: newsImageLabel.innerHTML,
                text: newsEditor.getData(),
                previousImage: newsPreviousNameImage,
                resultAddImage: resultnewsAddImage
            }
            fetch(url + 'news/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                newsRefreshForm();
            });
        }
    }

    function newsCreateRecord() {
        if (newsName.value && newsEditor.getData() && newsImageInput.files[0]) {
            newsAddImage();
            let req = {
                caption: newsName.value,
                image: newsImageLabel.innerHTML,
                text: newsEditor.getData()
            }
            fetch(url + 'news/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                newsRefreshForm();
            });
        }
    }

    function newsAddImage() {
        if (newsImageInput.files[0] && newsImageInput.files[0].name !== newsPreviousNameImage) {
            let file = newsImageInput.files[0];
            fetch(url + 'news/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            });
            return true;
        }
        return false;
    }

    function newsDeleteRecord() {
        let req = {
            id: newsSelectElement.value,
            image: newsImageLabel.innerHTML
        };
        fetch(url + 'news/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                newsRefreshForm();
            });
    }

    window.addEventListener('load', function () {
        newsGetAllRecords();
    });

    newsSelectElement.addEventListener('change', (event) => {
        if (newsSelectElement.value !== 'Новий запис') {
            newsGetRecordById();
        } else newsRefreshForm();
    });

    newsButtonUpdateOrCreate.addEventListener('click', (event) => {
        if (newsSelectElement.value === 'Новий запис') {
            newsCreateRecord();
        } else {
            newsUpdateRecord();
        }
        event.preventDefault();
    });

    newsImageInput.addEventListener('change', (event) => {
        newsPreviousNameImage = newsImageLabel.innerHTML;
        newsImageInput.files[0]
            ? newsImageLabel.innerHTML = newsImageInput.files[0].name
            : newsImageLabel.innerHTML = 'Оберіть файл';
    });

    newsButtonDelete.addEventListener('click', (event) => {
        if (newsSelectElement.value !== 'Новий запис') {
            newsDeleteRecord();
        }
        event.preventDefault();
    });

}