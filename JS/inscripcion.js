document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-inscripcion");

  // --- VALIDACIÓN DEL FORMULARIO ---
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const fecha = document.getElementById("fecha_nacimiento").value.trim();
    const pago = document.getElementById("pago").value;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/;
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{9}$/;
    const regexDNI = /^([0-9]{8}[A-Za-z]|[XYZxyz][0-9]{7}[A-Za-z])$/;

    document.querySelectorAll(".error-msg").forEach(e => e.remove());
    document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));

    let valido = true;

    const mostrarError = (id, mensaje) => {
      const input = document.getElementById(id);
      input.classList.add("error");
      const error = document.createElement("p");
      error.className = "error-msg";
      error.textContent = mensaje;
      error.style.color = "red";
      error.style.fontSize = "0.85em";
      input.insertAdjacentElement("afterend", error);
      valido = false;
    };

    if (!regexNombre.test(nombre)) mostrarError("nombre", "Introduce un nombre válido (solo letras).");
    if (!regexApellidos.test(apellidos)) mostrarError("apellidos", "Introduce apellidos válidos (solo letras).");
    if (!regexEmail.test(email)) mostrarError("email", "Correo electrónico no válido.");
    if (!regexTelefono.test(telefono)) mostrarError("telefono", "Teléfono de 9 dígitos requerido.");
    if (!regexDNI.test(dni)) mostrarError("dni", "Formato de DNI/NIE incorrecto.");
    if (fecha === "") mostrarError("fecha_nacimiento", "Selecciona una fecha válida.");
    if (pago === "") mostrarError("pago", "Selecciona una forma de pago.");

    if (valido) {
      alert("✅ Inscripción enviada correctamente. ¡Bienvenido a FitLife!");
      form.reset();
    }
  });

  // --- CÁLCULO DE PRESUPUESTO Y DESCUENTOS ---
  const mesesInput = document.getElementById("meses");
  const extras = document.querySelectorAll(".extra");
  const presupuestoInput = document.getElementById("presupuesto");
  const mensajeDescuento = document.getElementById("mensaje-descuento");

  function calcularPresupuesto() {
    let base = 0;
    const tipo = document.getElementById("tipo_inscripcion").value;
    if (tipo === "gym") base = 25;
    if (tipo === "gym-piscina") base = 35;
    if (tipo === "premium") base = 50;

    let meses = parseInt(mesesInput.value) || 1;
    let descuento = 0;

    if (meses >= 3 && meses <= 5) descuento = 0.05;
    else if (meses >= 6 && meses <= 11) descuento = 0.1;
    else if (meses >= 12) descuento = 0.15;

    let totalExtras = 0;
    extras.forEach(e => {
      if (e.checked) totalExtras += parseFloat(e.value);
    });

    let subtotal = (base + totalExtras) * meses;
    let totalFinal = subtotal - subtotal * descuento;

    mensajeDescuento.textContent = descuento > 0 ? `Descuento aplicado: ${descuento * 100}%` : "";
    presupuestoInput.value = `${totalFinal.toFixed(2)} €`;
  }

  mesesInput.addEventListener("input", calcularPresupuesto);
  extras.forEach(e => e.addEventListener("change", calcularPresupuesto));

  // --- MOSTRAR FORMULARIO AL ELEGIR UN PASE ---
  const paseCards = document.querySelectorAll(".pase-card");
  const volverBtn = document.getElementById("volver-btn");

  paseCards.forEach(card => {
    card.addEventListener("click", () => {
      document.getElementById("tipo_inscripcion").value = card.dataset.tipo;
      form.style.display = "block";
      volverBtn.style.display = "block";
      document.querySelector(".pases-container").style.display = "none";
      calcularPresupuesto();
    });
  });

  volverBtn.addEventListener("click", () => {
    form.style.display = "none";
    volverBtn.style.display = "none";
    document.querySelector(".pases-container").style.display = "flex";
  });
});



