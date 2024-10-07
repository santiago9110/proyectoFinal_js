function agregarAlCarrito(producto) {
    // Obtener el array de productos del localStorage y convertirlo a un objeto JavaScript
    let memoria = JSON.parse(localStorage.getItem("carnes"));
    console.log(memoria);
    let cuenta = 0;

    // Si no hay memoria (es decir, localStorage está vacío), inicializarlo
    if (!memoria || memoria.length === 0) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("carnes", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        // Buscar el índice del producto en el array de memoria
        const indiceProducto = memoria.findIndex(carne => carne.id === producto.id);

        console.log(indiceProducto);

        // Si el producto no está en memoria, lo añadimos
        if (indiceProducto === -1) {
            memoria.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        } else {
            // Si el producto ya existe, incrementamos su cantidad
            memoria[indiceProducto].cantidad++;
            cuenta = memoria[indiceProducto].cantidad;
        }

        // Actualizar el localStorage con la nueva memoria
        localStorage.setItem("carnes", JSON.stringify(memoria));
    }

    actualizarNumeroCarrito(); // Actualiza el número en el carrito
    return cuenta;
}

// Función para restar productos del carrito
function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("carnes")) || [];

    const indiceProducto = memoria.findIndex(carne => carne.id === producto.id);
    if (indiceProducto !== -1) {
        if (memoria[indiceProducto].cantidad > 1) {
            memoria[indiceProducto].cantidad--; // Restar cantidad si es mayor que 1
        } else {
            memoria.splice(indiceProducto, 1); // Eliminar producto si la cantidad es 1
        }
    }

    localStorage.setItem("carnes", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    return memoria[indiceProducto] ? memoria[indiceProducto].cantidad : 0; // Retorna 0 si se eliminó el producto
}

/** 
 * Función para crear un nuevo producto con la cantidad inicial en 1 
 */
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = { ...producto }; // Crear una copia del producto
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("carnes"));

    // Si no hay productos en el carrito, cuenta será 0
    if (memoria) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}

// Llamar a actualizarNumeroCarrito() para reflejar la cantidad actual al cargar la página
actualizarNumeroCarrito();
