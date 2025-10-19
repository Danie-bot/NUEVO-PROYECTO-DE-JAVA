// ------------------ Formulario ------------------
const form = document.getElementById("contactForm");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const telefono = form.telefono.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!soloLetras.test(nombre) || nombre.length > 15) {
      mostrarError("El nombre solo puede contener letras y máximo 15 caracteres.");
      return;
    }

    if (!soloLetras.test(apellidos) || apellidos.length > 40) {
      mostrarError("Los apellidos solo pueden contener letras y máximo 40 caracteres.");
      return;
    }

    if (!soloNumeros.test(telefono) || telefono.length !== 9) {
      mostrarError("El teléfono debe tener exactamente 9 números.");
      return;
    }

    if (!emailValido.test(email)) {
      mostrarError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (mensaje.length === 0) {
      mostrarError("Por favor, escribe tu mensaje.");
      return;
    }

    mensajeConfirmacion.textContent = `¡Gracias ${nombre}! Hemos recibido tu mensaje y te responderemos pronto.`;
    mensajeConfirmacion.style.color = "green";
    form.reset();
  });
}

function mostrarError(texto) {
  mensajeConfirmacion.textContent = texto;
  mensajeConfirmacion.style.color = "red";
}

// ------------------ Mapa dinámico ------------------
const gimnasio = [28.4682, -16.2546]; // Santa Cruz de Tenerife
const map = L.map('map').setView(gimnasio, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

L.marker(gimnasio)
  .addTo(map)
  .bindPopup("<b>FitLife Gym</b><br>Calle Salud y Deporte, 45, Tenerife")
  .openPopup();

// Botón para calcular ruta
const rutaBtn = document.createElement("button");
rutaBtn.textContent = "Calcular ruta hasta el gimnasio";
rutaBtn.style.marginTop = "10px";
rutaBtn.style.padding = "8px 12px";
rutaBtn.style.backgroundColor = "#28a745";
rutaBtn.style.color = "#fff";
rutaBtn.style.border = "none";
rutaBtn.style.borderRadius = "6px";
rutaBtn.style.cursor = "pointer";
document.querySelector(".container1").appendChild(rutaBtn);

rutaBtn.addEventListener("click", function () {
  if (!navigator.geolocation) {
    alert("Tu navegador no soporta geolocalización.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const cliente = [pos.coords.latitude, pos.coords.longitude];

      L.marker(cliente)
        .addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();

      L.Routing.control({
        waypoints: [
          L.latLng(cliente[0], cliente[1]),
          L.latLng(gimnasio[0], gimnasio[1])
        ],
        routeWhileDragging: true
      }).addTo(map);
    },
    function (err) {
      alert("No se pudo obtener tu ubicación. " + err.message);
    }
  );
});

