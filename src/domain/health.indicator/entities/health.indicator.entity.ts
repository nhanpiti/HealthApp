import { Entity, ManyToOne, PrimaryKey, Property, Ref } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@Entity()
export class HealthIndicatorEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @ApiProperty()
  @ManyToOne(() => PersonalProfileEntity)
  personalProfile!: PersonalProfileEntity;

  @Property()
  @ApiProperty()
  weight!: number;

  @Property()
  @ApiProperty()
  fatRatio!: number;

}
