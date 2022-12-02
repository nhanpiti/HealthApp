import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { MealTypeEntity } from "./meal.type.entity";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@Entity()
export class MealEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @ApiProperty()
  @ManyToOne(() => MealTypeEntity)
  mealType!: MealTypeEntity;

  @Property()
  @ApiProperty()
  image!: string;

  @ApiProperty()
  @ManyToOne(() => PersonalProfileEntity)
  personalProfile!: PersonalProfileEntity;

}
