import { ApiProperty } from "@nestjs/swagger";

export class SplashScreenRequestDto {

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File

}
