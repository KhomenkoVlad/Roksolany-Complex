const harchevSelectElement = document.getElementById('harchev-selelct');
const harchevID = document.getElementById('harchev-id');
const harchevName = document.getElementById('harchev-name');
const harchevImageLabel = document.getElementById('harchev-image-label');
const harchevImageInput = document.getElementById('harchev-image-input');
const harchevDescription = document.getElementById('harchev-description');
const harchevButtonUpdateOrCreate = document.getElementById('harchev-update-or-create');
const harchevButtonDelete = document.getElementById('harchev-delete');
let harchevPreviousNameImage;

export default function adminPanelHarchev(url) {

    function harchevRefreshForm() {
        harchevGetAllRecords();
        harchevButtonUpdateOrCreate.innerHTML = 'Додати';
        harchevSelectElement.value = 'Новий запис'
        harchevID.value = '';
        harchevName.value = '';
        harchevImageInput.setAttribute('required', '');
        harchevImageInput.value = null;
        harchevImageLabel.innerHTML = 'Оберіть файл';
        harchevDescription.value = '';
        harchevPreviousNameImage = '';
    }

    function harchevGetAllRecords() {
        fetch(url + "harchev/menu/all")
            .then(response => response.json())
            .then(data => {
                let options = '<option selected class="form-control">Новий запис</option>';
                data.forEach(element => {
                    options += `
                <option value="${element.harchev_id}" class="form-control">${element.name}</option>`;
                });
                harchevSelectElement.innerHTML = options;
            });
    }

    function harchevGetRecordById() {
        harchevButtonUpdateOrCreate.innerHTML = "Оновити";
        harchevImageInput.removeAttribute('required');
        let req = { id: harchevSelectElement.value };
        fetch(url + 'harchev/menu/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                harchevID.value = data[0].harchev_id;
                harchevName.value = data[0].name;
                harchevImageLabel.innerHTML = data[0].image;
                harchevDescription.value = data[0].description;
            });
    }

    function harchevUpdateRecord(resultHarchevAddImage) {
        if (harchevImageLabel.innerHTML) {
            harchevButtonUpdateOrCreate.innerHTML = "Додати";
            let req = {
                harchev_id: harchevID.value,
                name: harchevName.value,
                image: harchevImageLabel.innerHTML,
                description: harchevDescription.value,
                previousImage: harchevPreviousNameImage,
                resultAddImage: resultHarchevAddImage
            }
            fetch(url + 'harchev/menu/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(req)
            }).then(() => {
                harchevRefreshForm();
            });
        }
    }

    function harchevCreateRecord() {
        let req = {
            name: harchevName.value,
            image: harchevImageLabel.innerHTML,
            description: harchevDescription.value,
        }
        fetch(url + 'harchev/menu/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        }).then(() => {
            harchevRefreshForm();
        });
    }

    function harchevAddImage(mode) {
        if (harchevName.value && harchevImageInput.files[0]) {
            let file = harchevImageInput.files[0];
            fetch(url + 'harchev/menu/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            })
                .then(() => {
                    if (mode === 'create') {
                        harchevCreateRecord()
                    }
                    if (mode === 'update') {
                        harchevUpdateRecord(true)
                    }
                });
        }
    }

    function harchevDeleteRecord() {
        let req = {
            id: harchevSelectElement.value,
            image: harchevImageLabel.innerHTML
        };
        fetch(url + 'harchev/menu/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                harchevRefreshForm();
            });
    }

    window.addEventListener('load', function () {
        harchevGetAllRecords();
        harchevMainGetText();
    });

    harchevSelectElement.addEventListener('change', (event) => {
        if (harchevSelectElement.value !== 'Новий запис') {
            harchevGetRecordById();
        } else harchevRefreshForm();
    });

    harchevButtonUpdateOrCreate.addEventListener('click', (event) => {
        if (harchevSelectElement.value === 'Новий запис') {
            harchevAddImage('create');
        } else {
            harchevImageInput.files[0]
                ? harchevAddImage('update')
                : harchevUpdateRecord(false);
        }
        event.preventDefault();
    });

    harchevImageInput.addEventListener('change', (event) => {
        harchevPreviousNameImage = harchevImageLabel.innerHTML;
        harchevImageInput.files[0]
            ? harchevImageLabel.innerHTML = harchevImageInput.files[0].name
            : harchevImageLabel.innerHTML = 'Оберіть файл';
    });

    harchevButtonDelete.addEventListener('click', (event) => {
        if (harchevSelectElement.value !== 'Новий запис') {
            harchevDeleteRecord();
        }
        event.preventDefault();
    });

    function harchevMainGetText() {
        fetch(url + "harchev/main/get-text")
            .then(response => response.json())
            .then(data => {
                document.getElementById('harchev-index-editor').value = data[0].value;
            });
    }

    function harchevMainUpdate() {
        let req = {
            text: document.getElementById('harchev-index-editor').value
        }
        fetch(url + 'harchev/main/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        });
    }

    function harchevAddMainLogo() {
        if (document.getElementById('harchev-image-logo').files[0]) {
            let file = document.getElementById('harchev-image-logo').files[0];
            fetch(url + 'harchev/main/logo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            });
        }
    }

    document.getElementById('harchev-image-logo').addEventListener('change', (event) => {
        document.getElementById('harchev-image-logo').files[0]
            ? document.getElementById('harchev-index-logo-label').innerHTML = document.getElementById('harchev-image-logo').files[0].name
            : document.getElementById('harchev-index-logo-label').innerHTML = 'Оберіть файл';
    });

    document.getElementById('harchev-index-description').addEventListener('click', (event) => {
        harchevAddMainLogo();
        harchevMainUpdate();
        event.preventDefault();
    });
}
