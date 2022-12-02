import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { ExerciseEntity } from "./exercise.entity";

@Entity()
export class ExerciseTypeEntity {

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

  @OneToMany(() => ExerciseEntity, exerciseEntity => exerciseEntity.exerciseType)
  @ApiProperty()
  exercises = new Collection<ExerciseEntity>(this);

}
