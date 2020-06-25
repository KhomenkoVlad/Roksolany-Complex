const koloritSelectElement = document.getElementById('kolorit-selelct');
const koloritID = document.getElementById('kolorit-id');
const koloritName = document.getElementById('kolorit-name');
const koloritImageLabel = document.getElementById('kolorit-image-label');
const koloritImageInput = document.getElementById('kolorit-image-input');
const koloritDescription = document.getElementById('kolorit-description');
const koloritButtonUpdateOrCreate = document.getElementById('kolorit-update-or-create');
const koloritButtonDelete = document.getElementById('kolorit-delete');
let koloritPreviousNameImage;

export default function adminPanelKolorit(url) {

    function koloritRefreshForm() {
        koloritGetAllRecords();
        koloritButtonUpdateOrCreate.innerHTML = 'Додати';
        koloritSelectElement.value = 'Новий запис'
        koloritID.value = '';
        koloritName.value = '';
        koloritImageInput.setAttribute('required', '');
        koloritImageInput.value = null;
        koloritImageLabel.innerHTML = 'Оберіть файл';
        koloritDescription.value = '';
        koloritPreviousNameImage = '';
    }

    function koloritGetAllRecords() {
        fetch(url + "kolorit/menu/all")
            .then(response => response.json())
            .then(data => {
                let options = '<option selected class="form-control">Новий запис</option>';
                data.forEach(element => {
                    options += `
                <option value="${element.kolorit_id}" class="form-control">${element.name}</option>`;
                });
                koloritSelectElement.innerHTML = options;
            });
    }

    function koloritGetRecordById() {
        koloritButtonUpdateOrCreate.innerHTML = "Оновити";
        koloritImageInput.removeAttribute('required');
        let req = { id: koloritSelectElement.value };
        fetch(url + 'kolorit/menu/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                koloritID.value = data[0].kolorit_id;
                koloritName.value = data[0].name;
                koloritImageLabel.innerHTML = data[0].image;
                koloritDescription.value = data[0].description;
            });
    }

    function koloritUpdateRecord(resultKoloritAddImage) {
        if (koloritImageLabel.innerHTML) {
            koloritButtonUpdateOrCreate.innerHTML = "Додати";
            let req = {
                kolorit_id: koloritID.value,
                name: koloritName.value,
                image: koloritImageLabel.innerHTML,
                description: koloritDescription.value,
                previousImage: koloritPreviousNameImage,
                resultAddImage: resultKoloritAddImage
            }
            fetch(url + 'kolorit/menu/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                koloritRefreshForm();
            });
        }
    }

    function koloritCreateRecord() {
        let req = {
            name: koloritName.value,
            image: koloritImageLabel.innerHTML,
            description: koloritDescription.value,
        }
        fetch(url + 'kolorit/menu/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        }).then(() => {
            koloritRefreshForm();
        });
    }

    function koloritAddImage(mode) {
        if (koloritName.value && koloritImageInput.files[0]) {
            let file = koloritImageInput.files[0];
            fetch(url + 'kolorit/menu/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            })
                .then(() => {
                    if (mode === 'create') {
                        koloritCreateRecord()
                    }
                    if (mode === 'update') {
                        koloritUpdateRecord(true)
                    }
                });
        }
    }

    function koloritDeleteRecord() {
        let req = {
            id: koloritSelectElement.value,
            image: koloritImageLabel.innerHTML
        };
        fetch(url + 'kolorit/menu/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                koloritRefreshForm();
            });
    }

    window.addEventListener('load', function () {
        koloritGetAllRecords();
        koloritMainGetText();
    });

    koloritSelectElement.addEventListener('change', (event) => {
        if (koloritSelectElement.value !== 'Новий запис') {
            koloritGetRecordById();
        } else koloritRefreshForm();
    });

    koloritButtonUpdateOrCreate.addEventListener('click', (event) => {
        if (koloritSelectElement.value === 'Новий запис') {
            koloritAddImage('create');
        } else {
            koloritImageInput.files[0]
                ? koloritAddImage('update')
                : koloritUpdateRecord(false);
        }
        event.preventDefault();
    });

    koloritImageInput.addEventListener('change', (event) => {
        koloritPreviousNameImage = koloritImageLabel.innerHTML;
        koloritImageInput.files[0]
            ? koloritImageLabel.innerHTML = koloritImageInput.files[0].name
            : koloritImageLabel.innerHTML = 'Оберіть файл';
    });

    koloritButtonDelete.addEventListener('click', (event) => {
        if (koloritSelectElement.value !== 'Новий запис') {
            koloritDeleteRecord();
        }
        event.preventDefault();
    });

    function koloritMainGetText() {
        fetch(url + "kolorit/main/get-text")
            .then(response => response.json())
            .then(data => {
                document.getElementById('kolorit-index-editor').value = data[0].value;
            });
    }

    function koloritMainUpdate() {
        let req = {
            text: document.getElementById('kolorit-index-editor').value
        }
        fetch(url + 'kolorit/main/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        });
    }

    function koloritAddMainLogo() {
        if (document.getElementById('kolorit-image-logo').files[0]) {
            let file = document.getElementById('kolorit-image-logo').files[0];
            fetch(url + 'kolorit/main/logo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            });
        }
    }

    document.getElementById('kolorit-image-logo').addEventListener('change', (event) => {
        document.getElementById('kolorit-image-logo').files[0]
            ? document.getElementById('kolorit-index-logo-label').innerHTML = document.getElementById('kolorit-image-logo').files[0].name
            : document.getElementById('kolorit-index-logo-label').innerHTML = 'Оберіть файл';
    });

    document.getElementById('kolorit-index-description').addEventListener('click', (event) => {
        koloritAddMainLogo();
        koloritMainUpdate();
        event.preventDefault();
    });
}
