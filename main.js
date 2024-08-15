/* document.addEventListener('DOMContentLoaded', () => {
    class Producto {
        constructor(nombre, id, precio, stock) {
            this.nombre = nombre;
            this.id = id;
            this.precio = precio;
            this.stock = stock;
        }
    }

    // Array para almacenar los productos
    const productos = [
        new Producto('Mat Blue', '001', 35000, 12),
        new Producto('Mat Green', '002', 35000, 9),
        new Producto('Mat Purple', '003', 35000, 11),
        new Producto('Mat Corcho', '004', 40000, 6),
        new Producto('Portamat Liso', '005', 20000, 7),
        new Producto('Portamat Mandala', '006', 22000, 10),
        new Producto('Bolster Pink', '007', 18000, 5),
        new Producto('Bolster Grey', '008', 18000, 3),
        new Producto('Bolster Red', '009', 18000, 3),
        new Producto('Bloque Madera', '010', 9000, 12),
        new Producto('Bloque Goma Eva', '011', 14000, 9),
        new Producto('Bloque Corcho', '012', 18000, 6),
        new Producto('Cinto', '013', 6000, 8)
    ];

    // Inicializar carrito vacío
    let carrito = [];

    // Mostrar mensaje en la página
    function mostrarMensaje(mensaje, tipo = 'info', idContenedor = 'mensaje-contenedor') {
        const contenedorMensaje = document.getElementById(idContenedor);
        contenedorMensaje.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
        setTimeout(() => {
            contenedorMensaje.innerHTML = ''; 
        }, 3000);
    }

    // Renderizar productos en el HTML
    function renderizarProductos() {
        const contenedorProductos = document.getElementById('productos');
        contenedorProductos.innerHTML = '';

        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.className = 'col-md-4 mb-4';
            divProducto.innerHTML = `
                <div class="card">
                    <img src="assets/${producto.nombre}.png" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">ID: ${producto.id}</p>
                        <p class="card-text">Precio: $${producto.precio.toLocaleString()}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>
                        <input type="number" id="cantidad-${producto.id}" class="form-control mb-2" value="1" min="1" max="${producto.stock}">
                        <button class="btn btn-primary" data-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(divProducto);
        });

        // Asignar el evento click a todos los botones
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                agregarAlCarrito(this.getAttribute('data-id'));
            });
        });
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        const cantidadInput = document.getElementById(`cantidad-${id}`);
        const cantidad = parseInt(cantidadInput.value);

        if (!cantidad || cantidad <= 0 || cantidad > producto.stock) {
            mostrarMensaje('Cantidad inválida.', 'danger');
            return;
        }

        const objetoCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad
        };

        agregarCarrito(objetoCarrito);
        mostrarMensaje('Producto agregado al carrito.', 'success');
    }

    // Función para agregar un producto al carrito
    function agregarCarrito(objetoCarrito) {
        const itemCarrito = carrito.find(item => item.id === objetoCarrito.id);

        if (itemCarrito) {
            itemCarrito.cantidad += objetoCarrito.cantidad;
        } else {
            carrito.push(objetoCarrito);
        }

        renderizarCarrito();
    }

    // Función para renderizar el carrito
    function renderizarCarrito() {
        const contenedorCarrito = document.getElementById('carrito');
        const totalCarrito = document.getElementById('total-carrito');
        contenedorCarrito.innerHTML = '';

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<li class="list-group-item">El carrito está vacío.</li>';
            totalCarrito.textContent = 'Total: $0';
            return;
        }

        let total = 0;

        carrito.forEach(item => {
            const itemCarrito = document.createElement('li');
            itemCarrito.className = 'list-group-item d-flex justify-content-between align-items-center';
            itemCarrito.innerHTML = `
                ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
                <button class="btn btn-danger btn-sm ms-2" data-id="${item.id}">Eliminar</button>
            `;
            contenedorCarrito.appendChild(itemCarrito);

            total += item.precio * item.cantidad;
        });

        totalCarrito.textContent = `Total: $${total.toLocaleString()}`;

        // Asignar el evento click a todos los botones de eliminar
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', function() {
                eliminarDelCarrito(this.getAttribute('data-id'));
            });
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        renderizarCarrito();
        mostrarMensaje('Producto eliminado del carrito.', 'warning');
    }

    // Función para borrar todos los productos del carrito
    function borrarCarrito() {
        carrito.length = 0;  // Vacía el carrito
        renderizarCarrito();
        mostrarMensaje('Carrito vaciado.', 'info');
    }

    // Manejo del formulario de confirmación de compra
    document.getElementById('formulario-checkout').addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const comentarios = document.getElementById('comentarios').value;

        if (carrito.length === 0) {
            mostrarMensaje('El carrito está vacío.', 'danger');
            return;
        }

        borrarCarrito();
        mostrarMensaje(`Compra realizada con éxito. Muchas gracias por su compra, ${nombre}!`, 'success', 'mensaje-compra');
    });

    // Renderiza productos y carrito al cargar la página
    renderizarProductos();
    renderizarCarrito();
});
 */

document.addEventListener('DOMContentLoaded', () => {
    // Clase para definir los productos
    class Producto {
        constructor(nombre, id, precio, stock) {
            this.nombre = nombre;
            this.id = id;
            this.precio = precio;
            this.stock = stock;
        }
    }

    // Array para almacenar los productos
    const productos = [
        new Producto('Mat Blue', '001', 35000, 12),
        new Producto('Mat Green', '002', 35000, 9),
        new Producto('Mat Purple', '003', 35000, 11),
        new Producto('Mat Corcho', '004', 40000, 6),
        new Producto('Portamat Liso', '005', 20000, 7),
        new Producto('Portamat Mandala', '006', 22000, 10),
        new Producto('Bolster Pink', '007', 18000, 5),
        new Producto('Bolster Grey', '008', 18000, 3),
        new Producto('Bolster Red', '009', 18000, 3),
        new Producto('Bloque Madera', '010', 9000, 12),
        new Producto('Bloque Goma Eva', '011', 14000, 9),
        new Producto('Bloque Corcho', '012', 18000, 6),
        new Producto('Cinto', '013', 6000, 8)
    ];

    // Inicializar carrito vacío
    let carrito = [];

    // Mostrar mensaje en la página
    function mostrarMensaje(mensaje, tipo = 'info', idContenedor = 'mensaje-contenedor') {
        const contenedorMensaje = document.getElementById(idContenedor);
        contenedorMensaje.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
        setTimeout(() => {
            contenedorMensaje.innerHTML = ''; 
        }, 3000);
    }

    // Renderizar productos en el HTML
    function renderizarProductos() {
        const contenedorProductos = document.getElementById('productos');
        contenedorProductos.innerHTML = '';

        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.className = 'col-md-4 mb-4';
            divProducto.innerHTML = `
                <div class="card">
                    <img src="assets/${producto.nombre}.png" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">ID: ${producto.id}</p>
                        <p class="card-text">Precio: $${producto.precio.toLocaleString()}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>
                        <input type="number" id="cantidad-${producto.id}" class="form-control mb-2" value="1" min="1" max="${producto.stock}">
                        <button class="btn btn-primary" data-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(divProducto);
        });

        // Asignar el evento click a todos los botones
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                agregarAlCarrito(this.getAttribute('data-id'));
            });
        });
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        const cantidadInput = document.getElementById(`cantidad-${id}`);
        const cantidad = parseInt(cantidadInput.value);

        if (!cantidad || cantidad <= 0 || cantidad > producto.stock) {
            mostrarMensaje('Cantidad inválida.', 'danger');
            return;
        }

        const itemCarrito = carrito.find(item => item.id === id);

        if (itemCarrito) {
            itemCarrito.cantidad += cantidad;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad
            });
        }

        renderizarCarrito();
        mostrarMensaje('Producto agregado al carrito.', 'success');
    }

    // Función para renderizar el carrito
    function renderizarCarrito() {
        const contenedorCarrito = document.getElementById('carrito');
        const totalCarrito = document.getElementById('total-carrito');
        contenedorCarrito.innerHTML = '';

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<li class="list-group-item">El carrito está vacío.</li>';
            totalCarrito.textContent = 'Total: $0';
            return;
        }

        let total = 0;

        carrito.forEach(item => {
            const itemCarrito = document.createElement('li');
            itemCarrito.className = 'list-group-item d-flex justify-content-between align-items-center';
            itemCarrito.innerHTML = `
                ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
                <button class="btn btn-danger btn-sm ms-2" data-id="${item.id}">Eliminar</button>
            `;
            contenedorCarrito.appendChild(itemCarrito);

            total += item.precio * item.cantidad;
        });

        totalCarrito.textContent = `Total: $${total.toLocaleString()}`;

        // Asignar el evento click a todos los botones de eliminar
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', function() {
                eliminarDelCarrito(this.getAttribute('data-id'));
            });
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        renderizarCarrito();
        mostrarMensaje('Producto eliminado del carrito.', 'warning');
    }

    // Función para borrar todos los productos del carrito
    function borrarCarrito() {
        carrito.length = 0;  // Vacía el carrito
        renderizarCarrito();
        mostrarMensaje('Carrito vaciado.', 'info');
    }

    // Formulario de confirmación de compra
    document.getElementById('formulario-checkout').addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const comentarios = document.getElementById('comentarios').value;

        if (carrito.length === 0) {
            mostrarMensaje('El carrito está vacío.', 'danger');
            return;
        }

        borrarCarrito();
        mostrarMensaje(`Compra realizada con éxito. Muchas gracias por su compra, ${nombre}!`, 'success', 'mensaje-compra');
    });

    // Renderiza productos y carrito al cargar la página
    renderizarProductos();
    renderizarCarrito();
});
