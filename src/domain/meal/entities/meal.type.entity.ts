import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { MealEntity } from "./meal.entity";

@Entity()
export class MealTypeEntity {

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
  image!: string;

  @OneToMany(() => MealEntity, mealEntity => mealEntity.mealType)
  @ApiProperty()
  meals = new Collection<MealEntity>(this);

}
