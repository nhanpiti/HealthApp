import { ApiProperty } from "@nestjs/swagger";

export class SplashScreenResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  fileUrl!: string;

}
