import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { MealEntity } from "../../meal/entities/meal.entity";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@Entity()
export class CustomerEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @Property()
  @ApiProperty()
  countryCode!: number;

  @Property()
  @ApiProperty()
  name!: string;

  @Property()
  @ApiProperty()
  phoneNumber!: string;

  @OneToMany(() => PersonalProfileEntity, personalProfileEntity => personalProfileEntity.customer)
  @ApiProperty()
  personalProfiles = new Collection<PersonalProfileEntity>(this);

}
