const podvirjaSelectElement = document.getElementById('podvirja-selelct');
const podvirjaID = document.getElementById('podvirja-id');
const podvirjaName = document.getElementById('podvirja-name');
const podvirjaPrice = document.getElementById('podvirja-price');
const podvirjaArea = document.getElementById('podvirja-area');
const podvirjaQuantity = document.getElementById('podvirja-quantity');
const podvirjaImageLabel = document.getElementById('podvirja-image-label');
const podvirjaImageInput = document.getElementById('podvirja-image-input');
const podvirjaDescription = document.getElementById('podvirja-description');
const podvirjaButtonUpdateOrCreate = document.getElementById('podvirja-update-or-create');
const podvirjaButtonDelete = document.getElementById('podvirja-delete');
let podvirjaPreviousNameImage;

export default function adminPanelPodvirja(url) {

    function podvirjaRefreshForm() {
        podvirjaGetAllRecords();
        podvirjaButtonUpdateOrCreate.innerHTML = 'Додати';
        podvirjaSelectElement.value = 'Новий запис'
        podvirjaID.value = '';
        podvirjaName.value = '';
        podvirjaPrice.value = '';
        podvirjaArea.value = '';
        podvirjaQuantity.value = '';
        podvirjaImageInput.setAttribute('required', '');
        podvirjaImageInput.value = null;
        podvirjaImageLabel.innerHTML = 'Оберіть файл';
        podvirjaDescription.value = '';
        podvirjaPreviousNameImage = '';
    }

    function podvirjaGetAllRecords() {
        fetch(url + "podvirja/menu/all")
            .then(response => response.json())
            .then(data => {
                let options = '<option selected class="form-control">Новий запис</option>';
                data.forEach(element => {
                    options += `
                <option value="${element.podvirja_id}" class="form-control">${element.name}</option>`;
                });
                podvirjaSelectElement.innerHTML = options;
            });
    }

    function podvirjaGetRecordById() {
        podvirjaButtonUpdateOrCreate.innerHTML = "Оновити";
        podvirjaImageInput.removeAttribute('required');
        let req = { id: podvirjaSelectElement.value };
        fetch(url + 'podvirja/menu/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                podvirjaID.value = data[0].podvirja_id;
                podvirjaName.value = data[0].name;
                podvirjaPrice.value = data[0].price;
                podvirjaArea.value = data[0].area;
                podvirjaQuantity.value = data[0].quantity;
                podvirjaImageLabel.innerHTML = data[0].image;
                podvirjaDescription.value = data[0].description;
            });
    }

    function podvirjaUpdateRecord(resultPodvirjaAddImage) {
        if (podvirjaImageLabel.innerHTML) {
            podvirjaButtonUpdateOrCreate.innerHTML = "Додати";
            let req = {
                podvirja_id: podvirjaID.value,
                name: podvirjaName.value,
                price: podvirjaPrice.value,
                area: podvirjaArea.value,
                quantity: podvirjaQuantity.value,
                image: podvirjaImageLabel.innerHTML,
                description: podvirjaDescription.value,
                previousImage: podvirjaPreviousNameImage,
                resultAddImage: resultPodvirjaAddImage
            }
            fetch(url + 'podvirja/menu/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                podvirjaRefreshForm();
            });
        }
    }

    function podvirjaCreateRecord() {
        let req = {
            name: podvirjaName.value,
            price: podvirjaPrice.value,
            area: podvirjaArea.value,
            quantity: podvirjaQuantity.value,
            image: podvirjaImageLabel.innerHTML,
            description: podvirjaDescription.value,
        }
        fetch(url + 'podvirja/menu/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        }).then(() => {
            podvirjaRefreshForm();
        });
    }


    function podvirjaAddImage(mode) {
        if (podvirjaName.value && podvirjaImageLabel.innerHTML && podvirjaPrice.validity.valid && podvirjaArea.validity.valid && podvirjaQuantity.validity.valid) {
            let file = podvirjaImageInput.files[0];
            fetch(url + 'podvirja/menu/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            })
                .then(() => {
                    if (mode === 'create') {
                        podvirjaCreateRecord()
                    }
                    if (mode === 'update') {
                        podvirjaUpdateRecord(true)
                    }
                });
        }
    }

    function podvirjaDeleteRecord() {
        let req = {
            id: podvirjaSelectElement.value,
            image: podvirjaImageLabel.innerHTML
        };
        fetch(url + 'podvirja/menu/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                podvirjaRefreshForm();
            });
    }

    window.addEventListener('load', function () {
        podvirjaGetAllRecords();
        podvirjaMainGetText();
    });

    podvirjaSelectElement.addEventListener('change', (event) => {
        if (podvirjaSelectElement.value !== 'Новий запис') {
            podvirjaGetRecordById();
        } else podvirjaRefreshForm();
    });

    podvirjaButtonUpdateOrCreate.addEventListener('click', (event) => {
        if (podvirjaSelectElement.value === 'Новий запис') {
            podvirjaAddImage('create');
        } else {
            podvirjaImageInput.files[0]
                ? podvirjaAddImage('update')
                : podvirjaUpdateRecord(false);
        }
        event.preventDefault();
    });

    podvirjaImageInput.addEventListener('change', (event) => {
        podvirjaPreviousNameImage = podvirjaImageLabel.innerHTML;
        podvirjaImageInput.files[0]
            ? podvirjaImageLabel.innerHTML = podvirjaImageInput.files[0].name
            : podvirjaImageLabel.innerHTML = 'Оберіть файл';
    });

    podvirjaButtonDelete.addEventListener('click', (event) => {
        if (podvirjaSelectElement.value !== 'Новий запис') {
            podvirjaDeleteRecord();
        }
        event.preventDefault();
    });

    function podvirjaMainGetText() {
        fetch(url + "podvirja/main/get-text")
            .then(response => response.json())
            .then(data => {
                document.getElementById('podvirja-index-editor').value = data[0].value;
            });
    }

    function podvirjaMainUpdate() {
        let req = {
            text: document.getElementById('podvirja-index-editor').value
        }
        fetch(url + 'podvirja/main/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        });
    }

    function podvirjaAddMainLogo() {
        if (document.getElementById('podvirja-image-logo').files[0]) {
            let file = document.getElementById('podvirja-image-logo').files[0];
            fetch(url + 'podvirja/main/logo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            });
        }
    }

    document.getElementById('podvirja-image-logo').addEventListener('change', (event) => {
        document.getElementById('podvirja-image-logo').files[0]
            ? document.getElementById('podvirja-index-logo-label').innerHTML = document.getElementById('podvirja-image-logo').files[0].name
            : document.getElementById('podvirja-index-logo-label').innerHTML = 'Оберіть файл';
    });

    document.getElementById('podvirja-index-description').addEventListener('click', (event) => {
        podvirjaAddMainLogo();
        podvirjaMainUpdate();
        event.preventDefault();
    });
}