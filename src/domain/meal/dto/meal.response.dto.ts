import { ApiProperty } from "@nestjs/swagger";

export class MealResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  fileUrl!: string;

}
