export class Persona {
  constructor(
    public cedulaIdentidad: string,
    public nombres: string,
    public primerApellido: string,
    public segundoApellido: string,
    public fechaNacimiento: Date
  ) {}

  saludar(): void {
    console.log(`Soy ${this.nombres} y mi CI es ${this.cedulaIdentidad}`);
  }
}

export class Estudiante extends Persona {
  public carnetUniversitario: string;
  constructor(
    cedulaIdentidad: string,
    nombres: string,
    primerApellido: string,
    segundoApellido: string,
    fechaNacimiento: Date,
    carnetUniversitario: string
  ) {
    super(cedulaIdentidad, nombres, primerApellido, segundoApellido, fechaNacimiento);
    this.carnetUniversitario = carnetUniversitario;
  }

  saludar(): void {
    console.log(`Soy ${this.nombres} y mi CU es ${this.carnetUniversitario}`);
  }
}
