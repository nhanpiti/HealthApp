import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { ExerciseTypeEntity } from "./exercise.type.entity";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";
import { ExercisePostureEntity } from "./exercise.posture.entity";

@Entity()
export class ExerciseEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @ApiProperty()
  @ManyToOne(() => ExerciseTypeEntity)
  exerciseType!: ExerciseTypeEntity;

  @Property()
  @ApiProperty()
  caloriesBurn!: number;

  @ManyToMany(() => ExercisePostureEntity)
  @ApiProperty()
  postures = new Collection<ExercisePostureEntity>(this);

  @ApiProperty()
  @ManyToOne(() => PersonalProfileEntity)
  personalProfile!: PersonalProfileEntity;

}
