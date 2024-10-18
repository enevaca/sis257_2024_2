import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario es obligatorio' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(15, {
    message: 'El campo usuario no debe ser mayor a 15 caracteres',
  })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo email no debe ser mayor a 50 caracteres',
  })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo rol es obligatorio' })
  @IsString({ message: 'El campo rol debe ser de tipo cadena' })
  @MaxLength(15, {
    message: 'El campo rol no debe ser mayor a 15 caracteres',
  })
  readonly rol: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo premium debe estar definido' })
  @IsBooleanString({ message: 'El campo premium debe ser de tipo lógico' })
  readonly premium: boolean;
}
