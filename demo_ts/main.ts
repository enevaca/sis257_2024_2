import { Estudiante, Persona } from './poo'
// Esto es un comentario
/* Es es otro comentario
  en múltiples líneas */

// Tipos de datos
// Boolean
let esActivo: boolean = true; // let: El ámbito es local, funciona dentro del scope(función, ciclo, if, {})
var esActivo2: boolean = false; // var: El ámbito es en todo el archivo
const esActivo3: boolean = false; // Utilizado para constantes

// Number
let entero: number = 54;
let real: number = 6.87;
let binario: number = 0b101;
let octal: number = 0o11;
let hexadecimal: number = 0xF;
let enteroLargo: number = 546546546546;

// String
let sigla: string = 'SIS257';
let materia: string = 'Desarrollo de Aplicación Int/Internet II';
let concatenado: string = sigla + ' - ' + materia;
let concatenado2: string = `${sigla} - ${materia}`; // Alt + 96 = `
let separar: string[] = materia.split(' ');
let mayuscula: string = materia.toUpperCase();
let minuscula: string = materia.toLowerCase();
let reemplazo: string = materia.replace(/ /g, '*');
let subcadena: string = materia.substring(0, 5);
let repetir: string = sigla.repeat(3);
let sinEspaciosExtremos: string = ' Hola Mundo  '.trim();
let longitudCadena: number = sinEspaciosExtremos.length;

// Array
let array: string[] = ['uno', 'dos', 'tres'];
let arrayNumerico: number[] = [1, 2, 3, 4, 5];
let longitudArray: number = arrayNumerico.length;
let doble: number[] = arrayNumerico.map(n => n * 2);
let factorial: number = arrayNumerico.reduce((prev, curr) => prev * curr);
let impares: number[] = arrayNumerico.filter(n => n % 2 !== 0);
array.shift();        // Eliminar el primer elemento
array.pop();          // Eliminar el último elemento
array.push('cuatro'); // Agregar un elemento al final

// Tuple
let tuple = [true, 5.7, 'Hola', [6, 9, 12]];

// Enum
enum sexo { M = 'Masculino', F = 'Femenino' };
enum color { red = 'Rojo', yellow = 'Amarillo', green = 'Verde' };
enum tipo { par = 0, impar = 1 };

// Any
let cualquiera: any = 857;
cualquiera = 'Hola SIS457';

// Object
let objeto: Object = { nombre: 'Juna', apellidos: 'Pérez' };


// Estructuras de Control
let contiene: boolean;
if (materia.includes('Desarrollo')) contiene = true;
else contiene = false;

for(let i in array) console.log('for in: ' + i); // Obtiene posiciones
for(let i of array) console.log('for of: ' + i); // Obtiene valores
array.forEach(i => console.log('foreEach: ' + i)); // Obtiene valores

// interfaces
interface Docente {
  nombre: string,
  materia: string,
}
let docente: Docente = { nombre: 'Noel', materia: 'SIS257' };

// funciones
function saludar(nombre: string): void {
  console.log(`Hola qué tal ${nombre}?`);
}
saludar('Juan');

// POO
let persona: Persona = new Persona('123', 'Juan', 'Pérez', 'López', new Date('2000-09-17'));
persona.saludar();

let estudiante: Estudiante = new Estudiante('654', 'Aldo', 'Gutiérrez', 'Rojas', new Date('2002-12-25'), '25-2787');
estudiante.saludar();