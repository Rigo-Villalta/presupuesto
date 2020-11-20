/*
 Declaramos un objeto para contener los ingresos, egresos
 y los métodos para el cálculo de estos datos
 */

const miPresupuesto = {
    // Arreglos vacios para ingresos y egresos
    ingresos: [
    ],

    egresos: [
    ],

    // Métodos  

    // Calcula el total de los ingresos
    totalIngresos() {
        let total = 0;
        for (let i = 0; i < this.ingresos.length; i++) {
            total += this.ingresos[i][1];
        }
        return total.toFixed(2);
    },

    // Calcula el total de los egresos
    totalEgresos() {
        let total = 0;
        for (let i = 0; i < this.egresos.length; i++) {
            total += this.egresos[i][1];
        }
        return total.toFixed(2);
    },

    // Retorna el porcentaje de gasos respecto a ingresos
    porcentajeDeGastos() {
        if (this.ingresos.length == 0) {
            return 0.00;
        } else {
            total = (this.totalEgresos() * 100) / this.totalIngresos();
            return total.toFixed(2);
        }
    },


    // Retorna el balance del mes.
    balance() {
        let total = this.totalIngresos() - this.totalEgresos();
        return total.toFixed(2);
    }
}


// función para calcular el porcentaje de una egreso respecto a los ingresos totales
function porcentajeDeGastosDeunEgreso(Egreso) {
    if (miPresupuesto.ingresos.length == 0) {
        return 0;
    } else {
        total = (Egreso * 100) / miPresupuesto.totalIngresos();
        return total.toFixed(2);
    }
}


// Función para declarar mes en español según fecha actual
function mesEspanol(fecha) {
    const mesesEspanol = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    return mesesEspanol[fecha.getMonth()];
}


// Desplegamos mes y año en el documento
let hoy = new Date();
document.getElementById('fecha').innerHTML = `${mesEspanol(hoy)} ${hoy.getFullYear()}`;

// declaraciones y funciones  para mostrar las tabs de ingresos y egresos
// Para ingresos
document.getElementById('nav-ingresos').addEventListener('click', mostrarIngresos);

function mostrarIngresos() {
    document.getElementById('resumen-ingresos').classList.add('active');
    document.getElementById('nav-ingresos').classList.add('active', 'text-info');
    document.getElementById('resumen-egresos').classList.remove('active');
    document.getElementById('nav-egresos').classList.remove('active', 'text-info');
    displayPresupuesto();
}

// Para egresos
document.getElementById('nav-egresos').addEventListener('click', mostrarEgresos);

function mostrarEgresos() {
    document.getElementById('resumen-egresos').classList.add('active');
    document.getElementById('nav-egresos').classList.add('active', 'text-info');
    document.getElementById('resumen-ingresos').classList.remove('active');
    document.getElementById('nav-ingresos').classList.remove('active', 'text-info');
    displayPresupuesto();
}


/*
Función para mostrar correcta y dinámicamente las diferentes variables
dentro de la pantalla que cambian según el presupuesto.
*/
function displayPresupuesto() {

    // Obtenemos cada elemento por ID y le asignamos su contenido en base
    // al objeto presupuesto
    document.getElementById('ingresos-totales').innerHTML = miPresupuesto.totalIngresos();
    document.getElementById('egresos-totales').innerHTML = miPresupuesto.totalEgresos();
    document.getElementById('porcentaje-gastos').innerHTML = `${miPresupuesto.porcentajeDeGastos()}%`;
    document.getElementById('balance').innerHTML = `$${miPresupuesto.balance()}`;

    // Mostrar la lista de ingresos
    let ingresosResumen = document.getElementById('resumen-ingresos');
    ingresosResumen.innerHTML = "";
    for (let i = 0; i < miPresupuesto.ingresos.length; i++) {
        ingresosResumen.innerHTML += `<div class="row"><p class=" col-7 text-left">${miPresupuesto.ingresos[i][0]}:</p><p class=" col-5 text-right">+$${miPresupuesto.ingresos[i][1].toFixed(2)}</p></p>`;
    }

    // Mostrar la lista de egresos
    let egresosResumen = document.getElementById('resumen-egresos');
    egresosResumen.innerHTML = "";
    for (let i = 0; i < miPresupuesto.egresos.length; i++) {
        let egresoActual = miPresupuesto.egresos[i][1].toFixed(2);
        let porcentajeDeEgresoActual = porcentajeDeGastosDeunEgreso(egresoActual);
        egresosResumen.innerHTML += `<div class="row"><p class=" col-7 text-left">${miPresupuesto.egresos[i][0]}:</p><p class=" col-5 text-right">-$${egresoActual} <span class="badge badge-primary">${porcentajeDeEgresoActual}%</span></p></p>`;
    }

    // Desplegar errores si los hay.
    let errores = document.getElementById("errores");
    errores.classList.add("d-none");
    errores.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>';

    // Mostrar el porcentaje de gasos en diferentes colores según el porcentaje
    if (miPresupuesto.porcentajeDeGastos() < 90) {
        document.getElementById('porcentaje-gastos').classList.add('text-success');
        document.getElementById('porcentaje-gastos').classList.remove('text-danger', 'text-warning');
    } else if (miPresupuesto.porcentajeDeGastos() < 100) {
        document.getElementById('porcentaje-gastos').classList.add('text-warning');
        document.getElementById('porcentaje-gastos').classList.remove('text-danger', 'text-success');
    } else {
        document.getElementById('porcentaje-gastos').classList.add('text-danger');
        document.getElementById('porcentaje-gastos').classList.remove('text-success', 'text-warning');
    }


}


/* 
declaraciones para colectar la información del formulario
en el objeto miPresupuesto
*/

// Evento para click en el botón de "Agregar", para agregar nuevas transacciones
let botonTransaccion = document.getElementById("agregar-transaccion").addEventListener('click', agregarTransacion);

// Función para agregar una nueva transacción
function agregarTransacion() {
    let transaccion = new FormData(document.getElementById('formulario-transaccion'));

    // covierto el iterador transaccion a arreglo
    // para poder manipular los datos
    let arrayTransaccion = []

    for (let [clave, valor] of transaccion.entries()) {
        let arrayCampo = [];
        arrayCampo.push(clave);
        arrayCampo.push(valor);
        arrayTransaccion.push(arrayCampo);
    }

    // validación delos datos, si el dato de la cantidad no es válido
    // no se ingresa la transacción a los array
    try {
        arrayTransaccion[2][1];
    } catch (e) {
        let errores = document.getElementById("errores");
        errores.classList.remove("d-none");
        errores.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        errores.innerHTML += "Ingrese una cateogria: Ingreso o Egreso";
        return false;
    }

    // La otra validación, esta si no se ingresa un número en la casilla del monto
    const regexMoney = RegExp(/^[\d]*(\.\d{2})?$/);
    if ((regexMoney.test(arrayTransaccion[2][1])) === false) {
        let errores = document.getElementById("errores");
        errores.classList.remove("d-none");
        errores.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        errores.innerHTML += "Ingrese una cantidad de dinero en números dentro de la casilla monto";
        return false;
    } else {
        // seleccionamos el tipo de transacción y agregamos los datos en el objeto miPresupuesto
        if (arrayTransaccion[0][1] == "ingreso") {
            let nuevoIngreso = [arrayTransaccion[1][1], parseFloat(arrayTransaccion[2][1])];
            miPresupuesto.ingresos.push(nuevoIngreso);
            displayPresupuesto();
        } else if (arrayTransaccion[0][1] == "egreso") {
            let nuevoEgreso = [arrayTransaccion[1][1], parseFloat(arrayTransaccion[2][1])];
            miPresupuesto.egresos.push(nuevoEgreso);
            displayPresupuesto();
        }
    }
    // Vaciamos el formulario
    document.getElementById('formulario-transaccion').reset();
}

// Un evento para cerrar anuncions de errores
var cerrarErrores = document.getElementById("errores").addEventListener("click", cerrarVentanaErrores);

function cerrarVentanaErrores() {
    let errores = document.getElementById("errores")
    errores.classList.add("d-none");
    errores.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>';
}