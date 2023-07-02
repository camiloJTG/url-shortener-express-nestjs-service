import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { envSchemaValidation } from './config/validation.config';
import { ShortenerModule } from './shortener/shortener.module';
import { CommonModule } from './common/common.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: +process.env.TTL_TIME,
      limit: +process.env.TTL_LIMIT,
    }),
    ConfigModule.forRoot({ validationSchema: envSchemaValidation }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: Boolean(process.env.DB_SYNCRO),
      autoLoadEntities: Boolean(process.env.DB_AUTOLOAD),
    }),
    ShortenerModule,
    CommonModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
