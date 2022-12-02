import { ApiProperty } from "@nestjs/swagger";

export class HealthIndicatorRequestDto {

  @ApiProperty()
  personalProfile!: number;

  @ApiProperty()
  fatRatio!: number;

  @ApiProperty()
  weight!: number;

}
