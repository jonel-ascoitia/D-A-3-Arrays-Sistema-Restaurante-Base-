// ============================================================
// menu.js — DÍA 6: Capa DATA (Jonel driver)
// Solo contiene datos del menú y funciones que los modifican.
// ⚠️ NO usar document, innerHTML ni addEventListener aquí.
// ============================================================

export let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Ceviche", precio: 22, stock: 4 },
    { nombre: "Ají de gallina", precio: 15, stock: 2 },
    { nombre: "Anticuchos", precio: 14, stock: 0 }
];

export function agregarPlato(plato) {
    menu.push(plato);
}

export function actualizarStock(nombre, nuevoStock) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            menu[i].stock = nuevoStock;
            return true;
        }
    }
    return false;
}
