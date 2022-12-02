import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { HealthIndicatorEntity } from "../../health.indicator/entities/health.indicator.entity";
import { MealEntity } from "../../meal/entities/meal.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { DiaryNotebookEntity } from "../../diary.notebook/entities/diary.notebook.entity";
import { ExerciseEntity } from "../../exercise/entities/exercise.entity";

@Entity()
export class PersonalProfileEntity {

  @PrimaryKey()
  @ApiProperty()
  @Property()
  id!: number;

  @Property()
  @ApiProperty()
  createdTime!: Date;

  @Property()
  @ApiProperty()
  calorieUnit!: string;

  @Property()
  @ApiProperty()
  weightUnit!: string;

  @ApiProperty()
  @ManyToOne(() => CustomerEntity)
  customer!: CustomerEntity;

  @OneToMany(() => HealthIndicatorEntity, healthIndicator => healthIndicator.personalProfile)
  @ApiProperty()
  healthIndicators = new Collection<HealthIndicatorEntity>(this);

  @OneToMany(() => MealEntity, mealEntity => mealEntity.personalProfile)
  @ApiProperty()
  meals = new Collection<MealEntity>(this);

  @OneToMany(() => DiaryNotebookEntity, diaryNotebookEntity => diaryNotebookEntity.personalProfile)
  @ApiProperty()
  diaryNotebooks = new Collection<DiaryNotebookEntity>(this);

  @OneToMany(() => ExerciseEntity, exerciseEntity => exerciseEntity.personalProfile)
  @ApiProperty()
  exercises = new Collection<ExerciseEntity>(this);

}
