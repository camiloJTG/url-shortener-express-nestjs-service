import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateHash } from './interfaces/common.interfaces';

@Injectable()
export class CommonService {
  private readonly hashLength = this.configService.get<number>('HASH_LENGTH');
  private readonly appHost = this.configService.get<string>('APP_HOST');
  private readonly logger = new Logger(CommonService.name);

  constructor(private readonly configService: ConfigService) {}

  generateShortenedUrl(): GenerateHash {
    let hash = '';
    for (let i = 0; i < this.hashLength; i++) {
      const randomCharCode = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
      if (
        (randomCharCode >= 58 && randomCharCode <= 64) ||
        (randomCharCode >= 91 && randomCharCode <= 96)
      ) {
        i--;
        continue;
      }
      const char = String.fromCharCode(randomCharCode);
      hash += char;
    }
    return { code: hash, shortenedUrl: `${this.appHost}/${hash}` };
  }

  handlerError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (typeof error === 'object') throw error;
    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
