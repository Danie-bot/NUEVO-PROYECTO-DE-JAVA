document.addEventListener('DOMContentLoaded', () => {
  const paseCards = document.querySelectorAll('.pase-card');
  const form = document.getElementById('formulario-inscripcion');
  const tipoInput = document.getElementById('tipo_inscripcion');
  const volverBtn = document.getElementById('volver-btn');
  const infoPreinscripcion = document.getElementById('info-preinscripcion');
  const presupuestoInput = document.getElementById('presupuesto');
  const mesesInput = document.getElementById('meses');
  const extrasInputs = document.querySelectorAll('.extra');
  const mensajeDescuento = document.getElementById('mensaje-descuento');

  const Base = {
    "gym": 25,
    "gym-piscina": 35,
    "premium": 50
  };

  // Mostrar info-preinscripcion al inicio
  infoPreinscripcion.style.display = 'block';
  infoPreinscripcion.classList.add('show');

  paseCards.forEach(card => {
    card.addEventListener('click', () => {
      tipoInput.value = card.dataset.tipo;
      paseCards.forEach(other => {
        if (other !== card) other.classList.add('oculta'); 
        else card.classList.add('seleccionada'); 
      });
      form.style.display = 'flex';
      volverBtn.style.display = 'inline-block';

      // Ocultar info-preinscripcion
      infoPreinscripcion.classList.remove('show');
      setTimeout(() => { infoPreinscripcion.style.display = 'none'; }, 300);

      form.scrollIntoView({ behavior: 'smooth' });
      actualizarPresupuesto();
    });
  });

  volverBtn.addEventListener('click', () => {
    paseCards.forEach(card => card.classList.remove('seleccionada', 'oculta'));
    form.style.display = 'none';
    volverBtn.style.display = 'none';
    tipoInput.value = '';
    presupuestoInput.value = '0 €';
    mensajeDescuento.textContent = '';

    infoPreinscripcion.style.display = 'block';
    setTimeout(() => infoPreinscripcion.classList.add('show'), 10);

    document.querySelector('.pases-container').scrollIntoView({ behavior: 'smooth' });
  });

  // Actualizar presupuesto
  function actualizarPresupuesto() {
    const tipo = tipoInput.value;
    if (!tipo) return;
    let precio = Base[tipo];
    let meses = parseInt(mesesInput.value) || 1;

    extrasInputs.forEach(extra => { if (extra.checked) precio += parseFloat(extra.value); });

    let descuento = 0;
    let textoDescuento = '';
    if (meses >= 12) { descuento = 0.15; textoDescuento = '¡Tienes un 15% de descuento por 12 o más meses!'; }
    else if (meses >= 6) { descuento = 0.10; textoDescuento = '¡Tienes un 10% de descuento por 6-11 meses!'; }
    else if (meses >= 3) { descuento = 0.05; textoDescuento = '¡Tienes un 5% de descuento por 3-5 meses!'; }

    mensajeDescuento.textContent = textoDescuento;
    presupuestoInput.value = (precio * meses * (1 - descuento)).toFixed(2) + ' €';

    presupuestoInput.classList.add('actualizando');
    setTimeout(() => presupuestoInput.classList.remove('actualizando'), 300);
  }

  mesesInput.addEventListener('input', actualizarPresupuesto);
  extrasInputs.forEach(extra => extra.addEventListener('change', actualizarPresupuesto));

  // Validación simple del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Formulario enviado correctamente!');
    form.reset();
    presupuestoInput.value = '0 €';
    mensajeDescuento.textContent = '';
  });
});



