import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto) {
    return this.shortenerService.generateShortenedUrl(createShortenerDto);
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url = await this.shortenerService.getShortenedUrlInformation(id);
    return { url };
  }
}
