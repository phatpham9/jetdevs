import { ApiProperty } from '@nestjs/swagger';

export class Error {
  @ApiProperty({
    example: 'Error message',
    type: String,
  })
  message: string;

  @ApiProperty({
    example: 'Http status code',
    type: Number,
  })
  statusCode: number;
}
