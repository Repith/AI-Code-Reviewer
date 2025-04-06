import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from '@sinclair/typebox';

export const CreateReviewSchema = Type.Object({
  code: Type.String(),
  language: Type.String(),
});

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  language: string;
}
