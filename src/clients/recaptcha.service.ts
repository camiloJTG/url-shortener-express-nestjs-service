import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetScoreResp } from './interfaces/recaptcha.interface';

@Injectable()
export class RecapthaService {
  private key = this.configService.get<string>('RECAPTCHA_TOKEN_SERVICE');
  private url = this.configService.get<string>('RECAPTCHA_URL_VERIFY');

  constructor(private readonly configService: ConfigService) {}

  async getScore(token: string) {
    const resp = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${this.key}&response=${token}`,
    });

    const { success, score }: GetScoreResp = await resp.json();
    if (!success)
      throw new HttpException(
        'Too many requests. Please try again later',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    if (score < 0.5) {
      throw new HttpException(
        'Too many requests. Please try again later',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
