// David Rodriguez Couto david.rodcou@educa.jcyl.es

/*
    DECLARACION DE VARIABLES 
*/
// Declaramos las variabes de cada input
const form = document.querySelector("form")
const nombre = form.querySelector("#nombre")
const apellido1 = form.querySelector("#apellido1")
const apellido2 = form.querySelector("#apellido2")
const numExpediente = form.querySelector("#numExpediente")
const email = form.querySelector("#email")
const edad = form.querySelector("#edad")
const fechaNac = form.querySelector("#fechaNac")
const telefono = form.querySelector("#telefono")
const divaficion = form.querySelector("#aficiones")
const avisolegal = form.querySelector("#avisolegal")
const hijoid = form.querySelector('input[name="hijos"]')
var nombreTutor 
var apellido1Tutor 
var apellido2Tutor 
var telefonoTutor 
//declaramos una variable hijos donde  guardaremos en su momento la opcion de hijos seleccionada 
var hijos;

//declaramos una variable numaficiones donde guardaremos el numero de aficiones para poder ir añadiendo
var numaficiones = 1

//declaramos un array de personas para guardar los datos
const arrayPersonas = []

//declaramos el objeto Persona 
function Persona(nombre, apellido1, apellido2, email, fechaNac, telefono, hijos) {
    this.Nombre = nombre;
    this.Apellido1 = apellido1;
    this.Apellido2 = apellido2;
    this.Email = email,
    this.Nacimiento = fechaNac;
    this.Telefono = telefono;
    this.Hijos = hijos;
}

/*
    FUNCIONES  
*/

//Funcion que pinta el div del elemento pasado (un input) con mensaje de error 
const printError = (element, message) => {
    //llamamos al elemento padre y guardamos el divError en una variable 
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    //añadimos el mensaje a divError y le añadimos la clase error al div y eliminamos la success en caso de que exista
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

//Funcion inversa a la anterior

const printSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

//Funcion que elimina el mensaje de error sin añadir el de exito
const removeError = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
}

//Funcion que elimina ambos estados de todos los inputs 
function removeSE() {

    var inputs = form.querySelectorAll("input")
    for (let i = 0; i < inputs.length; i++) {
        var inputControl = inputs[i].parentElement
        inputControl.classList.remove("error");
        inputControl.classList.remove("success");
    }
}

//Funcion que valida el email con una expresion regular
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Funcion que valida el formato telefono con una expression regular

const isValidTelefono = telefono => {
    const re = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
    return re.test(String(telefono));
}

//Funcion que comprueba el telefono dependiendo de su obligatoriedad

function comprobarTelefono(telefono, obligatoriedad) {

    if (telefono.value === '' && obligatoriedad) {
        printError(telefono, 'El Telefono es obligatorio');
    } else if (!isValidTelefono(telefono.value)) {
        printError(telefono, 'El formato del telefono no es correcto (XXX-XXX-XXX)');
    } else {
        printSuccess(telefono);
    }
}

//Funcion que comprueba el texto pasandole el elemento, el tamaño maximo, minimo, y su obligatoriedad
function comprobarTexto(elemento, max, min, obligatoriedad) {
    //Quitamos los espacios del inico y del final
    elemento.value = elemento.value.trim()
    //obtenemos el label del input para conocer el nombre que tenemos escrito para señalar al usuario el input con el que estamos tratando

    let label = elemento.previousElementSibling
    label = label.innerText

    //declaramos una expresion regular para comprobar que el texto solo contenga texto o espacios er blanco (nombres compuestos, aficiones de mas de una palabra etc)
    const re = /^\D+\s?\D*$/
   
    //primero comprobamos que el texto no esta en blanco, en caso de que lo este, comprobaremos si el texto es obligatorio o no

    if (elemento.value != '') {

        //haremos un swich true donde iremos poniendo las diferentes validaciones del texto 
        switch (true) {
             //comprobamos que no sea menor al minimo
             case elemento.value.length < min:
                console.log(elemento.value.length)
                printError(elemento, label + " debe tener mas de " + min + " caracteres")
                break;

            // comprobamos que coincida con la expresion regular 
            case (!re.test(elemento.value)):
                printError(elemento, "El " + label + " no puede tener numeros ni espacios dobles")
                break;

            //comprobamos que no supere el maximo 
            case elemento.value.length > max:
                //en caso de que no haya maximo, y este sea 0 , no hara nada aqui y tampoco saldra del switch
                
                if (max != 0) {
                    printError(elemento, "El " + label + " debe tener " + max + " caracteres o menos")
                    break;
                }
           
            // si llega hasta aqui se marcara como exitoso
            default:
                printSuccess(elemento)
                break;
        }

    } else if (obligatoriedad) {

        printError(elemento, " El " + label + " es obligatorio");

    } else {
        // en caso de que no sea obligatorio, eliminaremos los posibles errores que hayan aparecido anteriormente
        removeError(elemento)
    }
}

//funcion que crea los campos del tutor

const crearTutor = () => {
    //primero crearemos el div del tutor donde meteremos los campos , asi como el divError que meteremos
    // a cada campo
    let divTutor = document.createElement("div")
    divTutor.setAttribute("id", "divTutor")

    let divError = document.createElement("div")
    divError.classList.add("error")

    //Creamos el input nombre 

    let divNombre = document.createElement("div")
    divNombre.classList.add("input-control")
    let labelNombre = document.createElement("label")
    labelNombre.setAttribute("for", "nombreTutor")
    labelNombre.innerText = "Nombre Tutor*"
    let inputNombre = document.createElement("input")

    //con esta opcion podemos asignar las propiedades del input de golpe
    Object.assign(inputNombre, {
        id: "nombreTutor",
        name: "nombreTutor",
        type: "text"
    })
    //metemos en nuestro divNombre los diferentes elementos
    divNombre.insertAdjacentElement("beforeend", labelNombre)
    divNombre.insertAdjacentElement("beforeend", inputNombre)
    console.log(divError)
    divNombre.insertAdjacentElement("beforeend", divError)

    // Creacion del primer apellido
    let divError2 = document.createElement("div")
    divError2.classList.add("error")
    let divApellido1 = document.createElement("div")
    divApellido1.classList.add("input-control")
    let labelApellido1 = document.createElement("label")
    labelApellido1.setAttribute("for", "apellido1Tutor")
    labelApellido1.innerText = "Primer Apellido Tutor*"
    let inputApellido1 = document.createElement("input")
    Object.assign(inputApellido1, {
        id: "apellido1Tutor",
        name: "apellido1Tutor",
        type: "text"
    })
    divApellido1.insertAdjacentElement("beforeend", labelApellido1)
    divApellido1.insertAdjacentElement("beforeend", inputApellido1)
    divApellido1.insertAdjacentElement("beforeend", divError2)

    //Creacion del segundo apellido
    let divError3 = document.createElement("div")
    divError3.classList.add("error")
    let divApellido2 = document.createElement("div")
    divApellido2.classList.add("input-control")
    let labelApellido2 = document.createElement("label")
    labelApellido2.setAttribute("for", "apellido2Tutor")
    labelApellido2.innerText = "Segundo Apellido Tutor*"
    let inputApellido2 = document.createElement("input")
    Object.assign(inputApellido2, {
        id: "apellido2Tutor",
        name: "apellido2Tutor",
        type: "text"
    })
    divApellido2.insertAdjacentElement("beforeend", labelApellido2)
    divApellido2.insertAdjacentElement("beforeend", inputApellido2)
    divApellido2.insertAdjacentElement("beforeend", divError3)

    //Creacion del telefono
    let divError4 = document.createElement("div")
    divError4.classList.add("error")
    let divtelefono = document.createElement("div")
    divtelefono.classList.add("input-control")
    let labeltelefono = document.createElement("label")
    labeltelefono.setAttribute("for", "telefonoTutor")
    labeltelefono.innerText = "Telefono Tutor*"
    let inputtelefono = document.createElement("input")
    Object.assign(inputtelefono, {
        id: "telefonoTutor",
        name: "telefonoTutor",
        type: "text"
    })
    divtelefono.insertAdjacentElement("beforeend", labeltelefono)
    divtelefono.insertAdjacentElement("beforeend", inputtelefono)
    divtelefono.insertAdjacentElement("beforeend", divError4)

    //Añadimos los 4 inputs a nuestro div correspondiente al tutor
    divTutor.insertAdjacentElement("beforeend", divNombre);
    divTutor.insertAdjacentElement("beforeend", divApellido1);
    divTutor.insertAdjacentElement("beforeend", divApellido2);
    divTutor.insertAdjacentElement("beforeend", divtelefono);

    //Añadimos nuestro tutor al formulario
    form.insertBefore(divTutor, form.querySelectorAll(".input-control")[7])

}

// Funcion sencilla que borra nuestro tutor en caso de que se cambie la edad 
function borrarTutor() {
    form.removeChild(form.querySelector("#divTutor"))
}

//Funcion para añadir mas aficiones al formulario, recibe un parametro que consiste
// en el numero de la aficion que estamos añadiendo
const añadirAficion = (num) => {

    // primero creamos el div donde estara el input
    let div = document.createElement("div")
    div.classList.add("input-control")

    //creacion del divError
    let divError = document.createElement("div")
    divError.classList.add("error")

    //Creamos el input
    let inputaficion = document.createElement("input")
    Object.assign(inputaficion, {
        id: "aficion" + num,
        name: "aficion" + num,
        type: "text"
    })

    //creamos el label
    let labelaficion = document.createElement("label")
    labelaficion.innerText = "Aficion  " + num
    labelaficion.setAttribute("for", "aficion" + num)

    //añadimos los elementos al div , y añadiremos este justo antes de nuestro boton de añadir aficiones
    div.insertAdjacentElement("beforeend", labelaficion)
    div.insertAdjacentElement("beforeend", inputaficion)
    div.insertAdjacentElement("beforeend", divError)
    divaficion.insertBefore(div, divaficion.querySelector("button"))

}

// funcion que valida el formulario
const validateForm = () => {
    // creamos una bandera que nos indica si el formulario es valido o no
    var valido = true
    //hacemos un trim a los valores
    const numExpedienteValue = numExpediente.value.trim();
    const emailValue = email.value.trim();
    const telefonoValue = telefono.value.trim();
    console.log(numExpedienteValue)

    // usamos nuestra funcion para comprobar el nombre, apellido, y texto 
    comprobarTexto(nombre, 15, 0, true)
    comprobarTexto(apellido1, 15, 0, true)
    comprobarTexto(apellido2, 15, 0, false)

    // como el numero de Expediente es evaluado a la hora de ingresarlo, bastara con comprobar que no esta en blanco
    if (numExpedienteValue == "") {
        printError(numExpediente, "El numero de expediente es obligatorio")
    }

    // comprobamos el email usando nuestra funcion 
    if (emailValue === '') {
        printError(email, 'El email es obligatorio');
    } else if (!isValidEmail(emailValue)) {
        printError(email, 'El formato de email no es correcto');
    } else {
        printSuccess(email);
    }

    // comprobamos que se ha introducido fecha de nacimiento , si no hay edad, es porque no se ha introducido 
    // (mirar el listener de fecha de nacimiento para entenderlo)
    if (edad.value == "") {
        printError(fechaNac, " La fecha de nacimiento es obligatoria")
    } else if (edad.value < 18) {

        //si es menor de edad, tendremos que comprobar los campos del tutor 
        console.log(nombreTutor.value)
        comprobarTexto(nombreTutor, 15, 0, true)
        comprobarTexto(apellido1Tutor, 15, 0, true)
        comprobarTexto(apellido2Tutor, 15, 0, false)

        //al ser menor de edad, el telefono normal no es obligatorio, pero si el del tutor
        comprobarTelefono(telefono, false)
        comprobarTelefono(telefonoTutor, true)
    } else {
        comprobarTelefono(telefono, true)
    }

    //recogemos todas las aficiones , y las recorremos comprobando el texto
    const aficiones = form.querySelector("#aficiones").querySelectorAll(".input-control input")
    for (let i = 0; i < aficiones.length; i++) {
        console.log(aficiones[i].value)
        comprobarTexto(aficiones[i], 0, 3, false);

    }
    // recogemos la casilla de hijos que haya sido seleccionada, si no se ha seleccionado ninguna
    // nos marcara error
    hijos = form.querySelector('input[name="hijos"]:checked')
    if (!hijos) {
        printError(hijoid, "Debe seleecionar una opcion")

    } else {
        printSuccess(hijoid)

    }

    // comprobamos que se haya aceptado el aviso legal
    if (!avisolegal.checked) {
        printError(avisolegal, "Deebe aceptar el aviso legal")
    } else {
        printSuccess(avisolegal)
    }

    //Por ultimo,recorreremos todos los inputs, si algunos de ello contiene la clase error
    // querra decir que no es valido, por consiguiente el formulario no estara validado
    var inputs = form.querySelectorAll("input")
    for (let i = 0; i < inputs.length; i++) {
        var inputControl = inputs[i].parentElement
        if (inputControl.classList.contains("error")) {
            valido = false;
            break;
        }
    }
    return valido;

};

// Funcion que crea una persona y la añade a nuestro array
function añadirPersona() {
    var persona = new Persona(nombre.value, apellido1.value, apellido2.value, email.value, fechaNac.value, telefono.value, hijos.value)
    arrayPersonas.push(persona)
}

//Funcion para mostrar la tabla, utilizando el array personas
function mostrarTabla() {

    //creamos un array para las columnas, que recorrera las claves de Persona, para que coincida correctamente
    var nombreColumnas = [];
    let claves = Object.keys(new Persona());
    for (let i = 0; i < claves.length; i++) {
        //añadimos las opciones deseadas, sortable y filter
        let objeto = {
            field: claves[i],
            sortable: true,
            filter: true
        }
        nombreColumnas.push(objeto)
    }

    //Seleccionamos como columnas nuestro array creado, y como filas el array de personas, utilizaremos
    // pagination:true para añadir paginacion a la tabla
    const gridOptions = {
        columnDefs: nombreColumnas,
        rowData: arrayPersonas,
        pagination: true
    };

    //Estamos usando la clase oculto, para ocultar o no los elementos de nuestro html
    // simplemente añadiremos esta clase al formulario, y se la quitarmeos a nuestra tabla
    document.querySelector(".container").classList.add("oculto")
    document.querySelector("#tabla").classList.remove("oculto")

    //por ultimo añadimos la tabla a el div que queremos que la contenga
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    
}

//Funcion que oculta la tabla y muestra el formulairo de nuevo
function OcultarTabla() {
    document.querySelector(".container").classList.remove("oculto")
    document.querySelector("#tabla").classList.add("oculto")
}

/* 
    EVENTOS
*/
/*
form.querySelectorAll("button")[1].addEventListener('click', e => {
    
    e.preventDefault();
    validateForm();
});
*/
//Evento que regula el numero de expediente, ocurre cuando se pierde el foco
numExpediente.addEventListener("focusout", () => {
    numExpediente.value = numExpediente.value.trim()
    /*
    if(numExpedienteValue == ""){
        printError(numExpediente,"El numero de expediente es obligatorio")
    }
    */

    // usamos un switch para validar
    switch (true) {

        //Validamos que se haya introducido datos
        case numExpediente.value.length == 0:

            printError(numExpediente, "El numero de expediente es obligatorio")
            break;

        // Validmos que sea un numero, y no mayor a 5
        case numExpediente.value.length != 5 || isNaN(numExpediente.value):

            // borramos el valor erroneo introducido
            numExpediente.value = "";
            printError(numExpediente, "Debes introducir 5 numeros");
            break;

        // Validamos que el nombre y el apellido1 no esten en blanco
        case (nombre.value === "" || apellido1.value === ""):
            numExpediente.value = "";
            printError(numExpediente, "Debe introducir  el nombre y apellido")
            break;

        // si es correcto, añadiremos al valor del numero de expediente nuestras iniciales
        // por ultimo, borraremos los errores anteriores
        default:
            numExpediente.value = nombre.value.substring(0, 1) + apellido1.value.substring(0, 1) + numExpediente.value
            removeError(numExpediente)
            break;

    }
})

//Evento que elimina las letras ( si existen) de nuestro numero al poner el foco
numExpediente.addEventListener("focusin", () => {
    if (numExpediente.value.length == 7) {
        numExpediente.value = numExpediente.value.substring(2, 7)
    }
})

//Evento que mostrara la edad , y en caso de que sea necesario llamara  ala funcion de crear tutor
fechaNac.addEventListener("focusout", () => {
    
    //Para comprobar la edad, pasaremos la fecha introducida a milisegundos, y la compararemos con la actual
    // luego pasaremos esos milisegundos a años
    let milisegundosNac = Date.parse(fechaNac.value)

    // si no se ha pasado de manera correcta a miliseugndos es porque no se ha introducido correctamente
    if (isNaN(milisegundosNac)) {
        printError(fechaNac, "Introduce una fecha de nacimiento correcta")
    } else {
        removeError(fechaNac)
        // hacemos lo indicado anteriormente, y truncamos el resultado al numero entero, introduciendo el resultado al input edad
        let edadvalue = Math.trunc((Date.now() - milisegundosNac) * 3.17098e-11)
        edad.value = edadvalue
        if (edad.value < 18) {
            crearTutor()
            nombreTutor = form.querySelector("#nombreTutor")
             apellido1Tutor = form.querySelector("#apellido1Tutor")
            apellido2Tutor = form.querySelector("#apellido2Tutor")
             telefonoTutor = form.querySelector("#telefonoTutor")
        } else {
            borrarTutor()
        }
    }

})

// Evento que regula el boton añadir aficion. aumentando el numero de aficiones y llamandoa  al funcion
form.querySelector("#añadirAficion").addEventListener("click", (e) => {
    e.preventDefault();
    numaficiones++
    añadirAficion(numaficiones)

})

// Evento que regula el "Enviar y nuevo"
form.querySelector("#botonNuevo").addEventListener('click', e => {
    e.preventDefault();
    // comprobamos que el formulario sea valido, es caso afirmativo, añadiremos la persona y resetearemos
    var valido = validateForm();
    if (valido) {
        añadirPersona();
        form.reset();
        removeSE()
    }

});

//Evento que regula el boton "Enviar y Mostrar"
//Valida el formulairo, y en caos afirmativo añadira una persona y mostrara la tabla
form.querySelector("#botonMostrar").addEventListener('click', e => {
    e.preventDefault();
    var valido = validateForm();
    if (valido) {
        añadirPersona();
        mostrarTabla();
    }

});

//Evento que regula el boton Volver de la tabla, reseteando el formulario
document.querySelector("#botonVolver").addEventListener('click', () => {
    OcultarTabla();
    form.reset();
    removeSE()
})
