// ============================================================
// operaciones.js — DÍA 6: Capa LÓGICA de negocio (Esteban driver)
// Contiene reglas de negocio. Importa datos, NO toca el DOM.
// ⚠️ NO usar document, innerHTML ni addEventListener aquí.
// ============================================================

import { menu } from "./menu.js";

export function buscarPlatoPorNombre(nombre) {
    return menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

export function filtrarStockBajo(limite = 3) {
    return menu.filter(p => p.stock <= limite);
}

export function obtenerResumenMenu() {
    return menu.map(p => `${p.nombre} — S/ ${p.precio}`);
}

export function venderPlato(nombre, cantidad) {
    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        return { ok: false, mensaje: "Plato no encontrado" };
    }
    if (plato.stock === 0) {
        return { ok: false, mensaje: "No disponible (agotado)" };
    }
    if (cantidad <= 0) {
        return { ok: false, mensaje: "Cantidad inválida" };
    }
    if (plato.stock < cantidad) {
        return { ok: false, mensaje: "Stock insuficiente" };
    }

    plato.stock -= cantidad;
    return { ok: true, mensaje: `Venta realizada: ${plato.nombre}` };
}

export function calcularEstadoPlato(plato) {
    if (plato.stock === 0) return "agotado";
    if (plato.stock <= 3) return "bajo";
    return "normal";
}

export function verificarEstadoGeneral() {
    let agotados = 0;
    let bajos = 0;
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) agotados++;
        else if (menu[i].stock <= 3) bajos++;
    }
    if (agotados > 0) return `⚠️ Hay platos agotados`;
    if (bajos > 0) return `🟠 Hay platos con stock bajo`;
    return "✅ Todo disponible";
}
