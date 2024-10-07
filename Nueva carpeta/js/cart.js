// Obtener el contenedor donde se agregarán las tarjetas de productos
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesTarejta = document.getElementById("unidades");
const precioTarjeta= document.getElementById("precio");


//fetch es obligatorio

/**
 * Función para crear y mostrar las tarjetas de productos en la página.
 * Toma los datos de los productos almacenados en localStorage bajo la clave "carnes",
 * y por cada producto crea una tarjeta que incluye imagen, nombre, precio y botones
 * para agregar o restar unidades.
 */
function crearTarjetasProductosInicio() {
    
    contenedorTarjetas.innerHTML="";
    // Obtener el array de productos del localStorage y convertirlo a un objeto JavaScript
    const array = JSON.parse(localStorage.getItem("carnes"));
   
    // Verificar si el array no es nulo y contiene al menos un producto
    if (array != null && array.length > 0) {

        // Recorrer cada producto dentro del array
        array.forEach(producto => {

            // Crear un nuevo elemento <div> que representará la tarjeta de producto
            const nuevoProducto = document.createElement("div");
            // Asignar la clase "tarjeta-producto" al nuevo div
            nuevoProducto.classList = "tarjeta-producto";

            // Asignar el contenido HTML dentro de la tarjeta del producto
            nuevoProducto.innerHTML = ` 
                <img src="./img/${producto.id}.jpg" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <div class="cantidad-container">
                    <button class="boton-restar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="boton-agregar">+</button>
                </div>
            `;
            
            // Agregar la tarjeta como hijo del contenedor de productos en el DOM
            contenedorTarjetas.appendChild(nuevoProducto);

            // Agregar un evento al botón de agregar para incrementar la cantidad y añadir al carrito
            // Aquí se selecciona el segundo botón (el de "agregar") utilizando getElementsByTagName("button")[1]
           
           
           
            nuevoProducto
            .getElementsByTagName("button")[1] // Selecciona el segundo botón (botón de agregar)
            .addEventListener("click", (e) => {
                

                const cuentaElement=e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText=agregarAlCarrito(producto);

                actualizarTotales();
            });
           
            nuevoProducto
            .getElementsByTagName("button")[0]
            .addEventListener("click",(e)=> {
                restarAlCarrito(producto);
                crearTarjetasProductosInicio();
                actualizarTotales();

            })
        

            
            
        });
    }
}


function actualizarTotales()
{
    const productos = JSON.parse(localStorage.getItem("carnes"));
let unidades=0;
let precio=0;
    if(productos && productos.length>0)
    {
        productos.forEach(productos=>
        {
            unidades+=productos.cantidad;
            precio+=productos.precio*productos.cantidad;
        }
        )
        
        unidadesTarejta.innerText=unidades;
        precioTarjeta.innerText=precio;
    }
}
// Llamar a la función para crear las tarjetas de productos al cargar la página
crearTarjetasProductosInicio();
actualizarTotales()
/**
 * Función para reiniciar el carrito.
 * Elimina todos los productos del localStorage y actualiza la interfaz.
 */
function reiniciarCarrito() {
    // Elimina el carrito del localStorage
    localStorage.removeItem("carnes");

    // Llama a la función que vuelve a crear las tarjetas de productos
    crearTarjetasProductosInicio();

    // Opcional: Actualizar el número del carrito (por ejemplo, en un contador en el DOM)
    actualizarNumeroCarrito();
}

// Agregar el evento al botón de reiniciar
const botonReiniciar = document.getElementById("reiniciar"); // Selecciona el botón de reiniciar
if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarCarrito);
}

