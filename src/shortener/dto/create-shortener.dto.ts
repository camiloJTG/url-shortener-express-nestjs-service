import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

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
}
