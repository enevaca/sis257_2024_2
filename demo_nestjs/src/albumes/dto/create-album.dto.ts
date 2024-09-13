import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaLanzamiento debe estar definido' })
  @IsDateString(
    {},
    { message: 'El campo fechaLanzmiento debe ser de tipo fecha' },
  )
  readonly fechaLanzamiento: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo idInterprete debe estar definido' })
  @IsNumber({}, { message: 'El campo idInterprete debe ser tipo numérico' })
  readonly idInterprete: number;
}
