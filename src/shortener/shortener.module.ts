import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { Shortener } from './entities/shortener.entity';
import { CommonModule } from 'src/common/common.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener]), CommonModule, ClientsModule],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
