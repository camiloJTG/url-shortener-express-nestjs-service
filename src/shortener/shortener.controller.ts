import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ApiTags } from '@nestjs/swagger';
import { swaggerDoc } from 'src/common/decorators/swagger-doc.decorator';

@ApiTags('shortener')
@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @swaggerDoc('shortenerGenerate')
  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto) {
    return this.shortenerService.generateShortenedUrl(createShortenerDto);
  }

  @swaggerDoc('redirectUrl')
  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url = await this.shortenerService.getShortenedUrlInformation(id);
    return { url };
  }
}
