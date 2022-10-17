document.addEventListener("DOMContentLoaded", function(){
    agregarPregunta()
})
//Datos del docente
let nombre_docente ;
let apellido_docente ;

let element;

//Funcion constructora
function preg(pregunta_array, respuesta_array) {
    this.pregunta_array = pregunta_array;
    this.respuesta_array = respuesta_array;
}



//Array de preguntas
let preguntas = new Map();
let respuestas = [];


//Agregar pregunta

let btn = document.getElementById("btn_1");
let padre_preguntas = document.getElementById("padre_preguntas");
let respuestas_alumnos = document.getElementById("respuestas_alumnos");
let preguntasdiv = document.getElementById("preguntas-alumnos-div");
let resultadodiv = document.getElementById("resultadodiv");
let contadorid = 0;
let contadorResp = 0;
let comparador = 0;
let correctas = 0;
btn.addEventListener("click", function () {
    
        if(document.getElementById("pregunta"+(contadorid)).value != ""){
        
            agregarPregunta();

        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Debe agregar la pregunta para continuar',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }       
});

//Guardar y finalizar
let btn_2 = document.getElementById("btn_2");

btn_2.addEventListener("click", function (){
    
    if(document.getElementById("pregunta"+contadorid).value != ""){
        
            
        nombre_docente = document.getElementById('nombre_docente').value;
        apellido_docente = document.getElementById("apellido_docente").value;
        
        try {
            for (let i = 1; i <= contadorid; i++) {
                preguntas.set(document.getElementById('pregunta'+i).value, document.getElementById("respuesta"+i).value);
            }
        } catch (error) {
            console.log(error);
        }


        let saludo = document.createElement("div");
        saludo.innerHTML= '<p>Gracias!</p>';

        padre_preguntas.append(saludo);

        let array_JSON = JSON.stringify (preguntas);

        localStorage.setItem ("preguntas", array_JSON);

    }
    else{
        Swal.fire({
            title: 'Error!',
            text: 'Debe agregar la pregunta para continuar',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    
})

//Boton Parte Alumno

let btn_3 = document.getElementById("btn_3");
btn_3.addEventListener("click", function (){
    document.getElementById("padre_preguntas").classList.add("esconder");
    document.getElementById("respuestas_alumnos").classList.add("mostrar");

    for (let preguntasalumno of preguntas.keys()) {
        contadorResp++;
        let pregunta_alumno = document.createElement("div");
        pregunta_alumno.innerHTML= '<br>  <label for="" >Pregunta '+ preguntasalumno +' </label>    <br>    <label for="" >Respuesta '+contadorResp+' </label>    <input id="respuestaalumno' + contadorResp + '" type="text" placeholder="Respuesta"> ';
        preguntasdiv.append(pregunta_alumno);
      }
    
})

//Boton comparar resultado
let btn_4 = document.getElementById("btn_4");
btn_4.addEventListener('click', function () {
    
    for (let respuestasalumno of preguntas.values()) {
        comparador++;
        console.log(document.getElementById("respuestaalumno"+comparador).value);
        if(respuestasalumno === document.getElementById("respuestaalumno"+comparador).value){
            correctas++;
            let pregunta_alumno = document.createElement("div");
            pregunta_alumno.innerHTML= '<br> <p> La respuesta número '+comparador +' es correcta</p>';
            resultadodiv.append(pregunta_alumno);
        }else{
            let pregunta_alumno = document.createElement("div");
            pregunta_alumno.innerHTML= '<br> <p> La respuesta número '+comparador +' es incorrecta</p>';
            resultadodiv.append(pregunta_alumno);
        }
      }




})

//Funciones
function agregarPregunta() {
    contadorid++;

    let nueva_pregunta = document.createElement("div");
    nueva_pregunta.innerHTML= '<br>  <label for="" >Pregunta '+ contadorid +' </label>    <input id="pregunta' + contadorid + '" type="text" placeholder="Pregunta"> <br>    <label for="" >Respuesta</label>    <input id="respuesta' + contadorid + '" type="text" placeholder="Respuesta"> ';
    padre_preguntas.append(nueva_pregunta);
}
