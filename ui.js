// ============================================================
// ui.js — DÍA 6: Capa UI / DOM (Esteban driver)
// Única capa que puede tocar el DOM. Conecta lógica con pantalla.
// ============================================================

import { menu, agregarPlato } from "./menu.js";
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    calcularEstadoPlato,
    verificarEstadoGeneral,
    venderPlatoAsync
} from "./operaciones.js";

export function renderMenu() {
    const output = document.getElementById("output");
    let html = "<h3>Menú</h3><ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        const estado = calcularEstadoPlato(plato);
        html += `<li class="${estado}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";
    html += `<p><strong>Total de platos: ${menu.length}</strong></p>`;
    html += `<p><em>${verificarEstadoGeneral()}</em></p>`;
    output.innerHTML = html;
}

export function renderLista(titulo, lista) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    for (let i = 0; i < lista.length; i++) {
        html += `<li>${lista[i]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

export function mostrarMensaje(texto, tipo = "info") {
    const output = document.getElementById("output");
    output.innerHTML = `<p class="${tipo}">${texto}</p>`;
}

export function conectarEventos() {
    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnResumen = document.getElementById("btnResumen");
    const inputBuscar = document.getElementById("inputBuscar");
    const btnVender = document.getElementById("btnVender");

    if (btnMostrar) btnMostrar.addEventListener("click", renderMenu);

    if (btnAgregar) btnAgregar.addEventListener("click", () => {
        agregarPlato({ nombre: "Pollo a la brasa", precio: 20, stock: 4 });
        renderMenu();
    });

    if (btnBuscar) btnBuscar.addEventListener("click", () => {
        const nombre = inputBuscar.value;
        const plato = buscarPlatoPorNombre(nombre);
        if (!plato) return mostrarMensaje("No encontrado");
        renderLista("Resultado", [`${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`]);
    });

    if (btnVender) {
        btnVender.addEventListener("click", async () => {
            const nombre = document.getElementById("inputBuscar").value;
            const cantidad = 1;
            try {
                mostrarMensaje("Procesando pedido...", "procesando");
                const mensaje = await venderPlatoAsync(nombre, cantidad);
                mostrarMensaje(mensaje, "exito");
                renderMenu();
            } catch (error) {
                mostrarMensaje(error.message, "error");
            }
        });
    }

    if (btnStockBajo) btnStockBajo.addEventListener("click", () => {
        const lista = filtrarStockBajo(3).map(p => `${p.nombre} — stock ${p.stock}`);
        renderLista("Stock bajo", lista);
    });

    if (btnResumen) btnResumen.addEventListener("click", () => {
        const lista = obtenerResumenMenu();
        renderLista("Resumen del menú", lista);
    });
}
