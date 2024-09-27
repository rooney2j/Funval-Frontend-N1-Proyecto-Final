/* -------------- DOM --------------- */
const boton_limpiar_todo = document.querySelector('#boton_de_limpiar')

// Columna del formulario
const formulario = document.querySelector('#formulario');
const input_montgage_amount = document.querySelector('#montgage_amount');
const input_montgage_term = document.querySelector('#montgage_term');
const input_interest_rate = document.querySelector('#interest_rate');
const input_radio_repayment = document.querySelector('#radio_repayment');
const input_radio_interest_only = document.querySelector('#radio_interest_only');
const boton_calcular = document.querySelector('#boton_calcular');

// Para las validaciones de los campos del formulario
const contenedor_montgage_amount = document.querySelector('#contenedor_montgage_amount');
const contenedor_montgage_term = document.querySelector('#contenedor_montgage_term');
const contenedor_interest_rate = document.querySelector('#contenedor_interest_rate');
const error_montgage_amount = document.querySelector('.error-montgage-amount');
const error_montgage_term = document.querySelector('.error-montgage-term');
const error_interest_rate = document.querySelector('.error-interest-rate');

// Para las validaciones de los radio inputs
const radio_inputs = document.querySelectorAll('input[name="flexRadioDefault"]');
const fieldset = document.querySelector('.radio-inputs-fieldset');
const error_radio_inputs = document.querySelector('.error-radio-inputs');

// Columna de resultados
const columna_resultados_vacia = document.querySelector('#columna_resultados_presentacion');
const columna_resultados_llena = document.querySelector('#columna_resultados_completa');
const resultado_pago_mensual = document.querySelector('#resultado_pago_mensual');
const resultado_pago_total = document.querySelector('#resultado_pago_total');

// Eventos
input_montgage_amount.addEventListener('input', () => {
    input_montgage_amount.value = input_montgage_amount.value.replace(/[^0-9,.]/, "");
})

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let validacion_input_montgage_amount = verificarInputMontgageAmount();
    let validacion_input_montgage_term = verificarInputMontgageTerm();
    let validacion_input_interest_rate = verificarInputInterestRate();
    let validacion_radio_inputs = verificarSeleccionRadioInputs();

    if (validacion_input_montgage_amount && validacion_input_montgage_term && validacion_input_interest_rate && validacion_radio_inputs) {

        let pago_mensual = calcularPagoMensual();
        let pago_mensual_con_dos_decimales = Number(pago_mensual.toFixed(2));
        let pago_mensual_formateado = pago_mensual_con_dos_decimales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        let pago_total = calcularPagoTotal(pago_mensual);
        let pago_total_con_dos_decimales = Number(pago_total.toFixed(2))
        let pago_total_formateado = pago_total_con_dos_decimales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        resultado_pago_mensual.textContent = `£${pago_mensual_formateado}`;
        resultado_pago_total.textContent = `£${pago_total_formateado}`;

        // Ocultar la columna de resultados vacía y mostrar la columna de resultados llena
        if (!columna_resultados_vacia.classList.contains('d-none')) {
            columna_resultados_vacia.classList.add('d-none');
        }

        if (columna_resultados_llena.classList.contains('d-none')) {
            columna_resultados_llena.classList.remove('d-none');
        }
    }
});

boton_limpiar_todo.addEventListener('click', limpiarPantalla);

/* ------------------------ Funciones -------------------------- */
// Devuelve el pago mensual en base a los valores de entrada del formulario
function calcularPagoMensual() {
    let P = input_montgage_amount.value;
    let n = input_montgage_term.value * 12;
    let r = input_interest_rate.value / 1200;

    return (P * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

// Devuelve el pago total en base al pago mensual y el número de años de hipoteca
function calcularPagoTotal(pago_mensual) {
    let montgage_term = input_montgage_term.value;

    return (pago_mensual * montgage_term * 12);
}

function limpiarPantalla() {
    formulario.reset();
}

// Validaciones
function verificarSeleccionRadioInputs() {
    let alguno_seleccionado = false;

    for (let i = 0; i < radio_inputs.length; i++) {
        if (radio_inputs[i].checked) {
            alguno_seleccionado = true;
            break;
        }
    }

    if (alguno_seleccionado) {
        error_radio_inputs.classList.add('d-none');
    } else {
        error_radio_inputs.classList.remove('d-none');
    }

    return alguno_seleccionado
}

function verificarInputMontgageAmount() {
    let verificador = false;

    if (input_montgage_amount.value !== "") {
        error_montgage_amount.classList.add('d-none');
        contenedor_montgage_amount.classList.remove('has-error');

        let valor = input_montgage_amount.value

        const patron_numero_valido = /^\d+(\.\d+)?$/;

        if (!patron_numero_valido.test(valor)) {
            error_montgage_amount.textContent = "Please enter valid data"
            error_montgage_amount.classList.remove('d-none');
            contenedor_montgage_amount.classList.add('has-error');
        } else {
            verificador = true;
        }

    } else {
        error_montgage_amount.classList.remove('d-none');
        contenedor_montgage_amount.classList.add('has-error');
    }

    return verificador;
}

function verificarInputMontgageTerm() {
    let verificador = false;

    if (input_montgage_term.value !== "") {
        error_montgage_term.classList.add('d-none');
        contenedor_montgage_term.classList.remove('has-error');

        let valor = input_montgage_term.value

        const patron_numero_valido = /^\d+$/;

        if (!patron_numero_valido.test(valor)) {
            error_montgage_term.textContent = "Please enter valid data"
            error_montgage_term.classList.remove('d-none');
            contenedor_montgage_term.classList.add('has-error');
        } else {
            verificador = true;
        }
    } else {
        error_montgage_term.classList.remove('d-none');
        contenedor_montgage_term.classList.add('has-error');
    }

    return verificador;
}

function verificarInputInterestRate() {
    let verificador = false;

    if (input_interest_rate.value !== "") {
        error_interest_rate.classList.add('d-none');
        contenedor_interest_rate.classList.remove('has-error');

        let valor = input_interest_rate.value

        const patron_numero_valido = /^\d+(\.\d+)?$/;

        if (!patron_numero_valido.test(valor)) {
            error_interest_rate.textContent = "Please enter valid data"
            error_interest_rate.classList.remove('d-none');
            contenedor_interest_rate.classList.add('has-error');
        } else {
            verificador = true;
        }
    } else {
        error_interest_rate.classList.remove('d-none');
        contenedor_interest_rate.classList.add('has-error');
    }

    return verificador;
}