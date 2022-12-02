import { ApiProperty } from "@nestjs/swagger";

export class DataRequestDto {

  @ApiProperty()
  name!: string;

}
