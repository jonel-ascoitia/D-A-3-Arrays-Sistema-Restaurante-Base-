// 1) VARIABLES + OBJETOS + ARRAYS
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Tacu tacu", precio: 15, stock: 8 },
    { nombre: "Causa limeña", precio: 10, stock: 12 }
];

// 2.5) FUNCIÓN: contar platos
function contarPlatos() {
    return menu.length;
}

// 2) FUNCIÓN: renderizar (mostrar) el menú en pantalla
function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = ""; // limpiar
    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";
    html += `<p><strong>Total de platos en el menú: ${contarPlatos()}</strong></p>`;
    output.innerHTML = html;
}

// 3) FUNCIÓN: agregar un plato demo al menú
function agregarPlatoDemo() {
    const nuevoPlato = { nombre: "Ceviche de pescado", precio: 25, stock: 6 };
    menu.push(nuevoPlato);
}

// 4) FUNCIONES DÍA 4 - Parte B y C (Jonel driver)
function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    for (let i = 0; i < listaDeTextos.length; i++) {
        html += `<li>${listaDeTextos[i]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function buscarPlatoPorNombre(nombre) {
    const platoEncontrado = menu.find(plato => plato.nombre.toLowerCase() === nombre.toLowerCase());
    if (platoEncontrado) {
        renderLista("Plato encontrado", [`${platoEncontrado.nombre} — S/ ${platoEncontrado.precio} — Stock ${platoEncontrado.stock}`]);
    } else {
        renderLista("Plato encontrado", ["No encontrado"]);
    }
}

// FUNCIONES DÍA 4 - Parte D, E y F (Esteban driver)
function filtrarStockBajo() {
    const platosStockBajo = menu.filter(plato => plato.stock <= 3);
    const listaTextos = platosStockBajo.map(plato => `${plato.nombre} — stock ${plato.stock}`);
    renderLista("Platos con stock bajo", listaTextos);
}

function obtenerResumenMenu() {
    const resumen = menu.map(plato => `${plato.nombre} — S/ ${plato.precio}`);
    renderLista("Resumen del menú", resumen);
}

function venderPlato(nombre, cantidad) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (!plato) {
        renderLista("Resultado de venta", ["Plato no existe"]);
        return;
    }
    if (plato.stock >= cantidad) {
        plato.stock -= cantidad;
        renderLista("Resultado de venta", ["Venta realizada"]);
        renderMenu();
    } else {
        renderLista("Resultado de venta", ["Stock insuficiente"]);
    }
}

// 5) EVENTOS
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});
document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});
document.getElementById("btnBuscar").addEventListener("click", () => {
    const inputDesc = document.getElementById("inputBuscar").value;
    buscarPlatoPorNombre(inputDesc);
});
document.getElementById("btnStockBajo").addEventListener("click", () => {
    filtrarStockBajo();
});
document.getElementById("btnResumen").addEventListener("click", () => {
    obtenerResumenMenu();
});
