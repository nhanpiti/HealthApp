import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

@Entity()
export class SplashScreenEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @Property()
  @ApiProperty()
  name!: string;

  @Property()
  @ApiProperty()
  fileName!: string;

  @Property()
  @ApiProperty()
  mimetype!: string;

}
