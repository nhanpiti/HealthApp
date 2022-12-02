import { ApiProperty } from "@nestjs/swagger";

export class MealTypeResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  fileUrl!: string;

}
