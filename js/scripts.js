const promoModal = document.getElementById('promoModal');

if (promoModal) {
    setTimeout(() => {
        promoModal.style.display = 'block';
        // Pendiente de una fase posterior: mover el foco al modal y aislar el fondo.
    }, 2000);
}

function cerrarModal() {
    if (promoModal) {
        promoModal.style.display = 'none';
        // Pendiente de una fase posterior: devolver el foco al disparador.
    }
}

function simularLogin(event) {
    event.preventDefault();

    const errorContainer = document.getElementById('form-error');
    const userField = document.getElementById('user');
    const honeypotField = document.getElementById('website');

    if (honeypotField && honeypotField.value.trim() !== '') {
        if (errorContainer) {
            errorContainer.innerHTML = "<span class='error-text'>No fue posible procesar la solicitud.</span>";
        }
        return;
    }

    if (errorContainer) {
        errorContainer.innerHTML = "<span class='error-text'>Los campos obligatorios deben completarse antes de continuar.</span>";
    }

    if (userField) {
        userField.style.borderColor = 'red';
    }
}
