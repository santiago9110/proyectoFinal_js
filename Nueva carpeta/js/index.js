const contenedorTarjetas = document.getElementById("productos-container");

const buscador=document.getElementById("buscador");
const botonBuscar=document.getElementById("buscar-btn");

// Función para crear tarjetas de productos
function crearTarjetasProductosInicio(array) {
    array.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList.add("tarjeta-producto");
        nuevoProducto.innerHTML = `
            <img src="./img/${producto.id}.jpg" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        contenedorTarjetas.appendChild(nuevoProducto);
        
        const botonAgregar = nuevoProducto.querySelector("button");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
    });
}

// Función para obtener los productos de la API
function obtenerProductos() {
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(data => {
            // Mostrar todos los productos al inicio
            crearTarjetasProductosInicio(data);

            // Agregar evento de búsqueda
            botonBuscar.addEventListener("click", () => {
                const nombreBuscado = buscador.value;
                buscarProducto(nombreBuscado, data);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

  // Función para buscar un producto por nombre
  function buscarProducto(nombreProducto, productos) {
    const productoEncontrado = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );
     contenedorTarjetas.innerHTML = ''; 
    if (productoEncontrado.length > 0) {
        crearTarjetasProductosInicio(productoEncontrado);
    } else {
        contenedorTarjetas.innerHTML = `<p>No se encontró el producto "${nombreProducto}".</p>`;
    }
}



// Llamar a la función para obtener productos cuando la página cargue
obtenerProductos();

