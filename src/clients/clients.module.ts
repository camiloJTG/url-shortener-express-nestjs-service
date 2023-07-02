import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecapthaService } from './recaptcha.service';

@Module({
  imports: [ConfigModule],
  providers: [RecapthaService],
  exports: [RecapthaService],
})
export class ClientsModule {}
