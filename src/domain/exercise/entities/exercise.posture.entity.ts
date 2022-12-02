import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { ExerciseEntity } from "./exercise.entity";

@Entity()
export class ExercisePostureEntity {

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

  @ManyToMany({ entity: 'ExerciseEntity', fixedOrder: true, lazy: true })
  @ApiProperty()
  exercises = new Collection<ExerciseEntity>(this);

}
