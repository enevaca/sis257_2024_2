"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudiante = exports.Persona = void 0;
class Persona {
    constructor(cedulaIdentidad, nombres, primerApellido, segundoApellido, fechaNacimiento) {
        this.cedulaIdentidad = cedulaIdentidad;
        this.nombres = nombres;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
    }
    saludar() {
        console.log(`Soy ${this.nombres} y mi CI es ${this.cedulaIdentidad}`);
    }
}
exports.Persona = Persona;
class Estudiante extends Persona {
    constructor(cedulaIdentidad, nombres, primerApellido, segundoApellido, fechaNacimiento, carnetUniversitario) {
        super(cedulaIdentidad, nombres, primerApellido, segundoApellido, fechaNacimiento);
        this.carnetUniversitario = carnetUniversitario;
    }
    saludar() {
        console.log(`Soy ${this.nombres} y mi CU es ${this.carnetUniversitario}`);
    }
}
exports.Estudiante = Estudiante;
