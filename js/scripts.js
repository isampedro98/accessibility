// Abre el modal después de 2 segundos (interrumpe la lectura sin aviso)
setTimeout(() => {
    document.getElementById('promoModal').style.display = 'block';
    // ERROR: El foco no se mueve al modal, los lectores de pantalla seguirán leyendo el fondo.
}, 2000);

function cerrarModal() {
    document.getElementById('promoModal').style.display = 'none';
    // ERROR: El foco no regresa al elemento que lo disparó.
}

// Lógica de checkbox falso (Inaccesible por teclado)
document.addEventListener('DOMContentLoaded', () => {
    const fakeChecks = document.querySelectorAll('.fake-checkbox');
    fakeChecks.forEach(check => {
        // Solo reacciona al clic del mouse, no hay evento para "keydown" (Espacio/Enter)
        check.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });
});

function simularLogin(event) {
    event.preventDefault();
    // ERROR: Mensaje de error basado solo en color
    document.getElementById('form-error').innerHTML = "<span style='color:red;'>Los campos marcados en este color son obligatorios.</span>";
    document.getElementById('user').style.borderColor = "red";
}
