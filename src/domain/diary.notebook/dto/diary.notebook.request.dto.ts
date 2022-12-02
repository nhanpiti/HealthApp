import { ApiProperty } from "@nestjs/swagger";

export class DiaryNotebookRequestDto {

  @ApiProperty()
  personalProfile!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

}
