import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateInterpreteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nacionalidad es obligatorio' })
  @IsString({ message: 'El campo nacionalidad debe ser tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nacionalidad no de ser mayor a 30 caracteres',
  })
  readonly nacionalidad: string;
}
