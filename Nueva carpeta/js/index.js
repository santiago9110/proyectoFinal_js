const contenedorTarjetas = document.getElementById("productos-container");
const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("buscar-btn");

// Función para crear tarjetas de productos
function crearTarjetasProductosInicio(array) {
    array.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList.add("tarjeta-producto");
        nuevoProducto.innerHTML = `
            <img src="./img/${producto.id}.jpg" alt="${producto.nombre}">  <!-- Imagen basada en el ID del producto -->
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        contenedorTarjetas.appendChild(nuevoProducto);
        
        const botonAgregar = nuevoProducto.querySelector("button");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
    });
}

// Función para buscar un producto por nombre
function buscarProducto(nombreProducto, productos) {
    const productoEncontrado = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );
    
    contenedorTarjetas.innerHTML = '';  // Limpiar el contenedor antes de mostrar los resultados

    if (productoEncontrado.length > 0) {
        crearTarjetasProductosInicio(productoEncontrado);
    } else {
        contenedorTarjetas.innerHTML = `<p>No se encontró el producto "${nombreProducto}".</p>`;
    }
}


// Función para manejar los productos después de obtenerlos
function manejarProductos(data) {
    // Mostrar todos los productos al inicio
    crearTarjetasProductosInicio(data.productos); // Acceder a los productos si están dentro de un objeto "productos"

    // Agregar evento de búsqueda
    buscador.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const nombreBuscado = buscador.value;
            buscarProducto(nombreBuscado, data.productos);
        }
    });
}

// Función para realizar el fetch de los productos
async function getProductos() {
    try {
        const response = await fetch('./db.json');  // Realizar la petición al archivo JSON local
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data = await response.json();  // Parsear la respuesta como JSON
        return data;  // Retornar los datos para ser utilizados
    } catch (error) {
        console.error('Error al obtener los productos:', error);  // Manejar errores
        return null;  // Retornar null en caso de error
    }
}

// Función principal que obtiene los productos y los maneja
async function obtenerProductos() {
    const productos = await getProductos();  // Esperar la respuesta de fetchProductos
    if (productos) {
        manejarProductos(productos);  // Si se obtuvieron productos, llamamos a manejarProductos
    }
}

// Llamar a la función para obtener productos cuando la página cargue
obtenerProductos();
