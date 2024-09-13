import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterpretesModule } from './interpretes/interpretes.module';
import { GenerosModule } from './generos/generos.module';
import { AlbumesModule } from './albumes/albumes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    InterpretesModule,
    GenerosModule,
    AlbumesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
