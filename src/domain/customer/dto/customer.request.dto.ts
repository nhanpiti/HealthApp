import { ApiProperty } from "@nestjs/swagger";
import { Property } from "@mikro-orm/core";

export class CustomerRequestDto {

  @ApiProperty()
  name!: string;

  @ApiProperty()
  countryCode!: number;

  @ApiProperty()
  phoneNumber!: string;

}
