import { ApiProperty } from "@nestjs/swagger";

export class MealRequestDto {

  @ApiProperty()
  personalProfile!: number;

  @ApiProperty()
  mealType!: number;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File

}
