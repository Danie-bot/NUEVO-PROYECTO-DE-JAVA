document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-inscripcion");
  const mesesInput = document.getElementById("meses");
  const extras = document.querySelectorAll(".extra");
  const presupuestoInput = document.getElementById("presupuesto");
  const mensajeDescuento = document.getElementById("mensaje-descuento");
  const paseCards = document.querySelectorAll(".pase-card");
  const volverBtn = document.getElementById("volver-btn");

  // --- FUNCIÓN PARA CALCULAR PRESUPUESTO ---
  function calcularPresupuesto() {
    const tipo = document.getElementById("tipo_inscripcion").value;
    let base = tipo === "gym" ? 25 : tipo === "gym-piscina" ? 35 : tipo === "premium" ? 50 : 0;

    let meses = parseInt(mesesInput.value) || 1;
    let descuento = meses >= 3 && meses <= 5 ? 0.05 :
                    meses >= 6 && meses <= 11 ? 0.10 :
                    meses >= 12 ? 0.15 : 0;

    let totalExtras = 0;
    extras.forEach(e => { if(e.checked) totalExtras += parseFloat(e.value); });

    let subtotal = (base + totalExtras) * meses;
    let totalFinal = subtotal * (1 - descuento);

    mensajeDescuento.textContent = descuento > 0 ? `Descuento aplicado: ${descuento * 100}%` : "";
    presupuestoInput.value = `${totalFinal.toFixed(2)} €`;
  }

  // --- VALIDACIÓN DEL FORMULARIO ---
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const fecha = document.getElementById("fecha_nacimiento").value.trim();
    const pago = document.getElementById("pago").value;

    // Validaciones según tus indicaciones
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/; // Letras, máximo 15
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/; // Letras, máximo 40
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato estándar correo
    const regexTelefono = /^[0-9]{1,9}$/; // Números, máximo 9

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

    // Validaciones exactas
    if (!regexNombre.test(nombre)) mostrarError("nombre", "Nombre: sólo letras y máximo 15 caracteres.");
    if (!regexApellidos.test(apellidos)) mostrarError("apellidos", "Apellidos: sólo letras y máximo 40 caracteres.");
    if (!regexTelefono.test(telefono)) mostrarError("telefono", "Teléfono: solo números, máximo 9 dígitos.");
    if (!regexEmail.test(email)) mostrarError("email", "Correo electrónico inválido. Ej: nnnnn_nnn@zzzzz.xxx");
    if (dni === "") mostrarError("dni", "DNI/NIE obligatorio.");
    if (fecha === "") mostrarError("fecha_nacimiento", "Selecciona una fecha válida.");
    if (pago === "") mostrarError("pago", "Selecciona una forma de pago.");

    if (valido) {
      alert(`✅ Inscripción enviada correctamente. Total a pagar: ${presupuestoInput.value}\n¡Bienvenido a FitLife!`);
      form.reset();
      presupuestoInput.value = "0 €";
      mensajeDescuento.textContent = "";
    }
  });

  // --- EVENTOS PARA CALCULO DE PRESUPUESTO ---
  mesesInput.addEventListener("input", calcularPresupuesto);
  extras.forEach(e => e.addEventListener("change", calcularPresupuesto));

  // --- MOSTRAR FORMULARIO AL ELEGIR UN PASE ---
  paseCards.forEach(card => {
    card.addEventListener("click", () => {
      document.getElementById("tipo_inscripcion").value = card.dataset.tipo;
      form.style.display = "block";
      volverBtn.style.display = "block";
      document.querySelector(".pases-container").style.display = "none";
      extras.forEach(e => e.checked = false); // Reset extras
      mesesInput.value = 1; // Reset meses
      calcularPresupuesto(); // Calcular inicial
      window.scrollTo({ top: form.offsetTop - 20, behavior: "smooth" });
    });
  });

  volverBtn.addEventListener("click", () => {
    form.style.display = "none";
    volverBtn.style.display = "none";
    document.querySelector(".pases-container").style.display = "flex";
    form.reset();
    presupuestoInput.value = "0 €";
    mensajeDescuento.textContent = "";
  });
});



