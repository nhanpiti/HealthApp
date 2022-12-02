import { ApiProperty } from "@nestjs/swagger";

export class ExerciseRequestDto {

  @ApiProperty()
  personalProfile!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  caloriesBurn!: number;

  @ApiProperty()
  exerciseType!: number;

  @ApiProperty()
  exercisePostures!: number[];

}
