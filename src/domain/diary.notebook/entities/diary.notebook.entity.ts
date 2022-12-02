import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@Entity()
export class DiaryNotebookEntity {

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
  title!: string;

  @Property({ columnType: 'text'})
  @ApiProperty()
  description!: string;

}
