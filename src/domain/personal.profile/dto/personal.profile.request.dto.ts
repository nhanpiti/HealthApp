import { ApiProperty } from "@nestjs/swagger";

export class PersonalProfileRequestDto {

  @ApiProperty()
  customer!: number;

  @ApiProperty()
  calorieUnit!: string;

  @ApiProperty()
  weightUnit!: string;

}
