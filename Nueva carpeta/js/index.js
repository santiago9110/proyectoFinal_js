const contenedorTarjetas = document.getElementById("productos-container");

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
            crearTarjetasProductosInicio(data); // Pasamos los productos obtenidos al DOM
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

// Llamar a la función para obtener productos cuando la página cargue
obtenerProductos();
