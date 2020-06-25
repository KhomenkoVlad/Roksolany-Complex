const kolibaSelectElement = document.getElementById('koliba-selelct');
const kolibaID = document.getElementById('koliba-id');
const kolibaName = document.getElementById('koliba-name');
const kolibaImageLabel = document.getElementById('koliba-image-label');
const kolibaImageInput = document.getElementById('koliba-image-input');
const kolibaDescription = document.getElementById('koliba-description');
const kolibaButtonUpdateOrCreate = document.getElementById('koliba-update-or-create');
const kolibaButtonDelete = document.getElementById('koliba-delete');
let kolibaPreviousNameImage;

export default function adminPanelKoliba(url) {

    function kolibaRefreshForm() {
        kolibaGetAllRecords();
        kolibaButtonUpdateOrCreate.innerHTML = 'Додати';
        kolibaSelectElement.value = 'Новий запис'
        kolibaID.value = '';
        kolibaName.value = '';
        kolibaImageInput.setAttribute('required', '');
        kolibaImageInput.value = null;
        kolibaImageLabel.innerHTML = 'Оберіть файл';
        kolibaDescription.value = '';
        kolibaPreviousNameImage = '';
    }

    function kolibaGetAllRecords() {
        fetch(url + "koliba/menu/all")
            .then(response => response.json())
            .then(data => {
                let options = '<option selected class="form-control">Новий запис</option>';
                data.forEach(element => {
                    options += `
                <option value="${element.koliba_id}" class="form-control">${element.name}</option>`;
                });
                kolibaSelectElement.innerHTML = options;
            });
    }

    function kolibaGetRecordById() {
        kolibaButtonUpdateOrCreate.innerHTML = "Оновити";
        kolibaImageInput.removeAttribute('required');
        let req = { id: kolibaSelectElement.value };
        fetch(url + 'koliba/menu/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                kolibaID.value = data[0].koliba_id;
                kolibaName.value = data[0].name;
                kolibaImageLabel.innerHTML = data[0].image;
                kolibaDescription.value = data[0].description;
            });
    }

    function kolibaUpdateRecord(resultKolibaAddImage) {
        if (kolibaImageLabel.innerHTML) {
            kolibaButtonUpdateOrCreate.innerHTML = "Додати";
            let req = {
                koliba_id: kolibaID.value,
                name: kolibaName.value,
                image: kolibaImageLabel.innerHTML,
                description: kolibaDescription.value,
                previousImage: kolibaPreviousNameImage,
                resultAddImage: resultKolibaAddImage
            }
            fetch(url + 'koliba/menu/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                kolibaRefreshForm();
            });
        }
    }

    function kolibaCreateRecord() {
        let req = {
            name: kolibaName.value,
            image: kolibaImageLabel.innerHTML,
            description: kolibaDescription.value,
        }
        fetch(url + 'koliba/menu/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        }).then(() => {
            kolibaRefreshForm();
        });
    }

    function kolibaAddImage(mode) {
        if (kolibaName.value && kolibaImageInput.files[0]) {
            let file = kolibaImageInput.files[0];
            fetch(url + 'koliba/menu/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            })
                .then(() => {
                    if (mode === 'create') {
                        kolibaCreateRecord()
                    }
                    if (mode === 'update') {
                        kolibaUpdateRecord(true)
                    }
                });
        }
    }

    function kolibaDeleteRecord() {
        let req = {
            id: kolibaSelectElement.value,
            image: kolibaImageLabel.innerHTML
        };
        fetch(url + 'koliba/menu/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                kolibaRefreshForm();
            });
    }

    window.addEventListener('load', function () {
        kolibaGetAllRecords();
        kolibaMainGetText();
    });

    kolibaSelectElement.addEventListener('change', (event) => {
        if (kolibaSelectElement.value !== 'Новий запис') {
            kolibaGetRecordById();
        } else kolibaRefreshForm();
    });

    kolibaButtonUpdateOrCreate.addEventListener('click', (event) => {
        if (kolibaSelectElement.value === 'Новий запис') {
            kolibaAddImage('create');
        } else {
            kolibaImageInput.files[0]
                ? kolibaAddImage('update')
                : kolibaUpdateRecord(false);
        }
        event.preventDefault();
    });

    kolibaImageInput.addEventListener('change', (event) => {
        kolibaPreviousNameImage = kolibaImageLabel.innerHTML;
        kolibaImageInput.files[0]
            ? kolibaImageLabel.innerHTML = kolibaImageInput.files[0].name
            : kolibaImageLabel.innerHTML = 'Оберіть файл';
    });

    kolibaButtonDelete.addEventListener('click', (event) => {
        if (kolibaSelectElement.value !== 'Новий запис') {
            kolibaDeleteRecord();
        }
        event.preventDefault();
    });

    function kolibaMainGetText() {
        fetch(url + "koliba/main/get-text")
            .then(response => response.json())
            .then(data => {
                document.getElementById('koliba-index-editor').value = data[0].value;
            });
    }

    function kolibaMainUpdate() {
        let req = {
            text: document.getElementById('koliba-index-editor').value
        }
        fetch(url + 'koliba/main/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        });
    }

    function kolibaAddMainLogo() {
        if (document.getElementById('koliba-image-logo').files[0]) {
            let file = document.getElementById('koliba-image-logo').files[0];
            fetch(url + 'koliba/main/logo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            });
        }
    }

    document.getElementById('koliba-image-logo').addEventListener('change', (event) => {
        document.getElementById('koliba-image-logo').files[0]
            ? document.getElementById('koliba-index-logo-label').innerHTML = document.getElementById('koliba-image-logo').files[0].name
            : document.getElementById('koliba-index-logo-label').innerHTML = 'Оберіть файл';
    });

    document.getElementById('koliba-index-description').addEventListener('click', (event) => {
        kolibaAddMainLogo();
        kolibaMainUpdate();
        event.preventDefault();
    });
}
