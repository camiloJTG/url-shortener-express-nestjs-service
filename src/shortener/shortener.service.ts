import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { CommonService } from '../common/common.service';
import { Shortener } from './entities/shortener.entity';
import { CreateShortenerResp } from './interfaces/shortener.interfaces';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
    private readonly commonService: CommonService,
  ) {}

  async generateShortenedUrl({ url }: CreateShortenerDto) {
    try {
      const { code, shortenedUrl } = this.commonService.generateShortenedUrl();
      const result = this.shortenerRepository.create({
        originalUrl: url,
        shortenedUrl,
        code,
      });
      await this.shortenerRepository.save(result);
      return {
        id: result.id,
        originalUrl: result.originalUrl,
        shortenedUrl,
      } as CreateShortenerResp;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }

  async getShortenedUrlInformation(id: string) {
    const result = await this.shortenerRepository.findOneBy({ code: id });
    if (!result) throw new BadRequestException('URL not found');
    return result.originalUrl;
  }
}
