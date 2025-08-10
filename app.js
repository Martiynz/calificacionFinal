
function readNumber(input) {

    return input.valueAsNumber;
  }
  
  function validarEntradas(p1, p2, p3) {
    const errores = [];
  
    if (!Number.isFinite(p1)) errores.push("La nota del 1.er Parcial no puede estar vacía y debe ser numérica.");
    if (!Number.isFinite(p2)) errores.push("La nota del 2.º Parcial no puede estar vacía y debe ser numérica.");
    if (!Number.isFinite(p3)) errores.push("La nota del 3.er Parcial no puede estar vacía y debe ser numérica.");
  

    if (Number.isFinite(p1) && (p1 < 0 || p1 > 30)) errores.push("La nota del 1.er Parcial debe estar entre 0 y 30.");
    if (Number.isFinite(p2) && (p2 < 0 || p2 > 30)) errores.push("La nota del 2.º Parcial debe estar entre 0 y 30.");
    if (Number.isFinite(p3) && (p3 < 0 || p3 > 40)) errores.push("La nota del 3.er Parcial debe estar entre 0 y 40.");
  
    return errores;
  }
  
  function obtenerCategoria(total) {
    if (total < 60) return { etiqueta: "Reprobado", color: "bg-danger", desc: "No alcanzó el puntaje mínimo. Revise contenidos y refuerce." };
    if (total <= 79) return { etiqueta: "Bueno", color: "bg-warning text-dark", desc: "Desempeño aceptable con áreas por mejorar." };
    if (total <= 89) return { etiqueta: "Muy Bueno", color: "bg-primary", desc: "Buen dominio de los contenidos." };
    return { etiqueta: "Sobresaliente", color: "bg-success", desc: "Excelente desempeño, ¡felicidades!" };
  }
  
  function actualizarVista(total, categoria) {
    const card = document.getElementById("cardResultado");
    const score = document.getElementById("scoreValor");
    const badge = document.getElementById("badgeCategoria");
    const texto = document.getElementById("textoCategoria");
  
    score.textContent = total.toFixed(2).replace(/\.00$/, ""); 
    badge.textContent = categoria.etiqueta;

    badge.className = "badge rounded-pill fs-6 px-3 py-2 " + categoria.color;
    texto.textContent = categoria.desc;
  
    card.classList.remove("d-none");
  }
  
  function limpiarFormulario() {
    const form = document.getElementById("formNotas");
    form.reset();
    document.getElementById("cardResultado").classList.add("d-none");
    document.getElementById("parcial1").focus();
  }
  
  function calcular() {
    const i1 = document.getElementById("parcial1");
    const i2 = document.getElementById("parcial2");
    const i3 = document.getElementById("parcial3");
  
    const p1 = readNumber(i1);
    const p2 = readNumber(i2);
    const p3 = readNumber(i3);
  
    const errores = validarEntradas(p1, p2, p3);
  
    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Revisa los datos",
        html: `<ul class="text-start mb-0">${errores.map(e => `<li>${e}</li>`).join("")}</ul>`,
        confirmButtonText: "Entendido"
      });
      return;
    }
  
    const total = p1 + p2 + p3;
    const categoria = obtenerCategoria(total);
  
    actualizarVista(total, categoria);
  

    Swal.fire({
      icon: "success",
      title: "¡Cálculo realizado!",
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Total:</strong> ${total.toFixed(2).replace(/\.00$/, "")} / 100</p>
          <p class="mb-0"><strong>Categoría:</strong> ${categoria.etiqueta}</p>
        </div>
      `,
      confirmButtonText: "Ok"
    });
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnCalcular").addEventListener("click", calcular);
    document.getElementById("btnLimpiar").addEventListener("click", () => {
      limpiarFormulario();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Formulario restablecido",
        showConfirmButton: false,
        timer: 1600,
        timerProgressBar: true
      });
    });
  });
  