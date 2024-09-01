"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poo_1 = require("./poo");
// Esto es un comentario
/* Es es otro comentario
  en múltiples líneas */
// Tipos de datos
// Boolean
let esActivo = true; // let: El ámbito es local, funciona dentro del scope(función, ciclo, if, {})
var esActivo2 = false; // var: El ámbito es en todo el archivo
const esActivo3 = false; // Utilizado para constantes
// Number
let entero = 54;
let real = 6.87;
let binario = 0b101;
let octal = 0o11;
let hexadecimal = 0xF;
let enteroLargo = 546546546546;
// String
let sigla = 'SIS257';
let materia = 'Desarrollo de Aplicación Int/Internet II';
let concatenado = sigla + ' - ' + materia;
let concatenado2 = `${sigla} - ${materia}`; // Alt + 96 = `
let separar = materia.split(' ');
let mayuscula = materia.toUpperCase();
let minuscula = materia.toLowerCase();
let reemplazo = materia.replace(/ /g, '*');
let subcadena = materia.substring(0, 5);
let repetir = sigla.repeat(3);
let sinEspaciosExtremos = ' Hola Mundo  '.trim();
let longitudCadena = sinEspaciosExtremos.length;
// Array
let array = ['uno', 'dos', 'tres'];
let arrayNumerico = [1, 2, 3, 4, 5];
let longitudArray = arrayNumerico.length;
let doble = arrayNumerico.map(n => n * 2);
let factorial = arrayNumerico.reduce((prev, curr) => prev * curr);
let impares = arrayNumerico.filter(n => n % 2 !== 0);
array.shift(); // Eliminar el primer elemento
array.pop(); // Eliminar el último elemento
array.push('cuatro'); // Agregar un elemento al final
// Tuple
let tuple = [true, 5.7, 'Hola', [6, 9, 12]];
// Enum
var sexo;
(function (sexo) {
    sexo["M"] = "Masculino";
    sexo["F"] = "Femenino";
})(sexo || (sexo = {}));
;
var color;
(function (color) {
    color["red"] = "Rojo";
    color["yellow"] = "Amarillo";
    color["green"] = "Verde";
})(color || (color = {}));
;
var tipo;
(function (tipo) {
    tipo[tipo["par"] = 0] = "par";
    tipo[tipo["impar"] = 1] = "impar";
})(tipo || (tipo = {}));
;
// Any
let cualquiera = 857;
cualquiera = 'Hola SIS457';
// Object
let objeto = { nombre: 'Juna', apellidos: 'Pérez' };
// Estructuras de Control
let contiene;
if (materia.includes('Desarrollo'))
    contiene = true;
else
    contiene = false;
for (let i in array)
    console.log('for in: ' + i); // Obtiene posiciones
for (let i of array)
    console.log('for of: ' + i); // Obtiene valores
array.forEach(i => console.log('foreEach: ' + i)); // Obtiene valores
let docente = { nombre: 'Noel', materia: 'SIS257' };
// funciones
function saludar(nombre) {
    console.log(`Hola qué tal ${nombre}?`);
}
saludar('Juan');
// POO
let persona = new poo_1.Persona('123', 'Juan', 'Pérez', 'López', new Date('2000-09-17'));
persona.saludar();
let estudiante = new poo_1.Estudiante('654', 'Aldo', 'Gutiérrez', 'Rojas', new Date('2002-12-25'), '25-2787');
estudiante.saludar();
