fetch('http://localhost:3000/api/contactos', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        let menu = document.getElementById('menu');
        let opciones = '';
        for (let i = 1; i < data.length; i++) {
            opciones += `<option value="${data[i].id}">${data[i].nombre}</option>`
        }
        menu.innerHTML += opciones;
    })


const oculOne = document.getElementById('btnOc');
oculOne.addEventListener('click', () => {
    let info = document.getElementById('info');
    info.innerHTML = '';
})


const bruh = document.getElementById('menu');
bruh.addEventListener('change', () => {
    let info = document.getElementById('info');
    console.log(bruh.value)
    fetch(`http://localhost:3000/api/contactos/${bruh.value}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            info.innerHTML = '';
            info.innerHTML += `<p>${data[0].nombre}<br>${data[0].celular}<br>${data[0].email}</p>`
        })
})


const listAll = document.getElementById('btnList');
listAll.addEventListener('click', () => {
    fetch('http://localhost:3000/api/contactos', { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            let lista = document.getElementById('lista');
            let registros = '';
            for (let i = 1; i < json.length; i++) {
                registros += `<p>Registro: ${json[i].id}<br></p><p>${json[i].nombre}<br>${json[i].celular}<br>${json[i].email}</p>`
            }
            lista.innerHTML = registros;
        })

})


const ocul = document.getElementById('btnOcul');
ocul.addEventListener('click', () => {
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
})


const cjson = document.getElementById('btnPost');
cjson.addEventListener('click', () => {
    let nombre = document.getElementById('nombre4').value;
    let celular = document.getElementById('celular').value;
    let email = document.getElementById('email').value;
    let edad = document.getElementById('edad4').value;
    let activo = document.getElementById('activo').value;
    let dep = document.getElementById('dependi').value;
    let depe = [];
    for (let i = 0; i < dep; i++) {
        let nombre = document.getElementById(`nom${i}`).value;
        let edad = document.getElementById(`eda${i}`).value;
        depe.push({ nombre: nombre, edad: edad })
    }
    let fulljson = {
        nombre: nombre,
        celular: celular,
        email: email,
        edad: edad,
        activo: activo,
        dependiente: depe
    }
    console.log(depe)
    console.log(fulljson)
    fetch('http://localhost:3000/api/contactos/', {
            method: 'POST',
            body: JSON.stringify(fulljson),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datos => {
            console.log(datos)
            let menu = document.getElementById('detalles');
            menu.innerHTML += `Contacto agregado`
        })
})
const detalles = document.getElementById('btnDetails');
detalles.addEventListener('click', () => {
    let detalles = document.getElementById('detalles');
    detalles.innerHTML = '';
})

const depen = document.getElementById('btnDepen');
depen.addEventListener('click', () => {
    let dependiente = document.getElementById('dependiente');
    let dep = document.getElementById('dependi').value;
    dependiente.innerHTML = '';
    for (let i = 0; i < dep; i++) {

        dependiente.innerHTML += `
        <form class="form">
        <p>dependiente ${i}</p>
        <label for="nom${i}">nombre
        <input id="nom${i}" name="nom${i}">
        </label><br>
        <label for="eda${i}">edad
        <input id="eda${i}" name="eda${i}">
        </label><br><br>
        </form>`
    }
})