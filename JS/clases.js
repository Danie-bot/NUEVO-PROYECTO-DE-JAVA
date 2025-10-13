document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnReserva");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Gracias por tu interés. Un asesor se pondrá en contacto contigo para reservar tu clase de prueba.");
  });
});

