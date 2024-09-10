// Variable para almacenar los productos
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función asíncrona para obtener productos desde el archivo JSON
async function obtenerProductos() {
  try {
    const respuesta = await fetch("./productos.json");
    productos = await respuesta.json();
    renderizarProductos();
  } catch (error) {
    console.error("Hubo un problema al cargar los productos:", error);
  }
}

document
  .getElementById("filtro-categoria")
  .addEventListener("change", function () {
    const categoriaSeleccionada = this.value;
    renderizarProductos(categoriaSeleccionada);
  });

function renderizarProductos(categoria = "todos") {
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = "";

  const productosFiltrados =
    categoria === "todos"
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  productosFiltrados.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.className = "col-md-4 mb-4";
    divProducto.innerHTML = `
            <div class="card">
                <img src="assets/${
                  producto.nombre
                }.png" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <small class="text-body-secondary">ID: ${
                      producto.id
                    }</small>
                    <p class="card-text"><b>Precio: $${producto.precio.toLocaleString()}</b></p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    <input type="number" id="cantidad-${
                      producto.id
                    }" class="form-control mb-2" value="1" min="1" max="${
      producto.stock
    }">
                    <button class="btn btn-primary" data-id="${
                      producto.id
                    }">Agregar al carrito</button>
                </div>
            </div>
        `;
    contenedorProductos.appendChild(divProducto);
  });

  // Asignación del evento click a todos los botones
  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.addEventListener("click", function () {
      agregarAlCarrito(this.getAttribute("data-id"));
    });
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const cantidadInput = document.getElementById(`cantidad-${id}`);
  const cantidad = parseInt(cantidadInput.value);

  if (!cantidad || cantidad <= 0 || cantidad > producto.stock) {
    return;
  }

  const itemCarrito = carrito.find((item) => Number(item.id) === Number(id));
  console.log("Producto encontrado:", itemCarrito);

  if (itemCarrito) {
    itemCarrito.cantidad += cantidad;
  } else {
    carrito.push({
      id: String(producto.id),
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
    });
  }

  // Se guarda carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();

  Toastify({
    text: "Producto agregado",
    duration: 1500,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    offset: {
      x: "2rem",
      y: "1.5rem",
    },
    style: {
      background: "linear-gradient(to right, #50964b, #50964b)",
      borderRadius: "1rem",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Función para renderizar el carrito
function renderizarCarrito() {
  const contenedorCarrito = document.getElementById("carrito");
  const totalCarrito = document.getElementById("total-carrito");
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML =
      '<li class="list-group-item">El carrito está vacío.</li>';
    totalCarrito.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach((item) => {
    const itemCarrito = document.createElement("li");
    itemCarrito.className =
      "list-group-item d-flex justify-content-between align-items-center";
    itemCarrito.innerHTML = `
            ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
            <button class="btn btn-danger btn-sm ms-2" data-id="${
              item.id
            }">Eliminar</button>
        `;
    contenedorCarrito.appendChild(itemCarrito);

    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = `Total: $${total.toLocaleString()}`;

  // Asignación del evento click a todos los botones de eliminar
  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", function () {
      eliminarDelCarrito(this.getAttribute("data-id"));
    });
  });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    offset: {
      x: "2rem",
      y: "1.5rem",
    },
    style: {
      background: "linear-gradient(to right, #c43b46, #c43b46)",
      borderRadius: "1rem",
    },
    onClick: function () {},
  }).showToast();

  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

// Función para vaciar el formulario
function vaciarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comentarios").value = "";
}

// Formulario de confirmación de compra
document
  .getElementById("formulario-checkout")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    if (carrito.length === 0) {
      return;
    }

    borrarCarrito(); //Borrar carrito
    vaciarFormulario(); // Vaciar el formulario
    Swal.fire({
      icon: "success",
      title: `Muchas gracias por su compra. Enviaremos su ticket al correo electrónico.`,
      showConfirmButton: true,
    });
  });

// Función para borrar el carrito
function borrarCarrito() {
  carrito.length = 0; // Vacía el carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

// Cargar productos y carrito al cargar la página
obtenerProductos();
renderizarCarrito();
