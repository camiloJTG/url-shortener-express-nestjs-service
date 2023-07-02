import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @ApiProperty({
    description: 'Original url',
    type: 'URL',
    example: 'https://www.google.com',
    required: true,
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Token generated from the front',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  recaptchaToken: string;
}
