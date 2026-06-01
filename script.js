// ==========================================
// 1. FILTRADO DE CASAS (Buscador en Tiempo Real)
// ==========================================
function buscarCasas() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const tarjetasCasas = document.querySelectorAll('.casa-card');

    tarjetasCasas.forEach(tarjeta => {
        // Busca dentro del título o la descripción de la tarjeta
        const titulo = tarjeta.querySelector('.casa-titulo').textContent.toLowerCase();
        const ubicacion = tarjeta.querySelector('.casa-ubicacion').textContent.toLowerCase();

        if (titulo.includes(input) || ubicacion.includes(input)) {
            tarjeta.style.display = "block"; // Muestra la tarjeta
        } else {
            tarjeta.style.display = "none";  // Oculta la tarjeta
        }
    });
}

// ==========================================
// 2. MODO OSCURO (Para lectura cómoda)
// ==========================================
function toggleModoOscuro() {
    document.body.classList.toggle('dark-mode');
    
    // Guardar la preferencia del usuario en el navegador
    const esOscuro = document.body.classList.contains('dark-mode');
    localStorage.setItem('modoOscuro', esOscuro);
}

// Cargar la preferencia de modo oscuro al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('modoOscuro') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ==========================================
// 3. SIMULADOR DE HIPOTECA BÁSICO
// ==========================================
function calcularHipoteca() {
    const precio = parseFloat(document.getElementById('hipoteca-precio').value) || 0;
    const interesAnual = parseFloat(document.getElementById('hipoteca-interes').value) || 0;
    const plazoAnios = parseInt(document.getElementById('hipoteca-plazo').value) || 0;

    if (precio === 0 || plazoAnios === 0) {
        document.getElementById('hipoteca-resultado').textContent = "Por favor, llena todos los campos.";
        return;
    }

    // Cálculo matemático estándar de cuota mensual
    const meses = plazoAnios * 12;
    const interesMensual = (interesAnual / 100) / 12;
    
    let cuotaMensual = 0;
    
    if (interesMensual === 0) {
        cuotaMensual = precio / meses;
    } else {
        cuotaMensual = (precio * interesMensual) / (1 - Math.pow(1 + interesMensual, -meses));
    }

    // Mostrar el resultado formateado a 2 decimales
    document.getElementById('hipoteca-resultado').innerHTML = `
        <strong>Cuota mensual estimada:</strong> $${cuotaMensual.toFixed(2)}
    `;
}
