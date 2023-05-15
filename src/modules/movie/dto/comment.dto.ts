import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDTO {
  @ApiProperty({
    description: 'comment body',
    required: true,
    maxLength: 500,
  })
  @IsNotEmpty()
  @MaxLength(500, { message: 'Comment must be less than 500 length' })
  comment: string;
}
