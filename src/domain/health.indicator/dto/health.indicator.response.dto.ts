import { ApiProperty } from "@nestjs/swagger";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { HealthIndicatorEntity } from "../../health.indicator/entities/health.indicator.entity";
import { MealEntity } from "../../meal/entities/meal.entity";
import { DiaryNotebookEntity } from "../../diary.notebook/entities/diary.notebook.entity";
import { ExerciseEntity } from "../../exercise/entities/exercise.entity";

export class HealthIndicatorResponseDto {

  @ApiProperty()
  id!: number;

  @ApiProperty()
  createdTime!: Date;

  @ApiProperty()
  calorieUnit!: string;

  @ApiProperty()
  weightUnit!: string;

  @ApiProperty()
  customer: CustomerEntity;

  @ApiProperty()
  healthIndicators!: HealthIndicatorEntity[];

  @ApiProperty()
  meals!: MealEntity[];

  @ApiProperty()
  diaryNotebooks!: DiaryNotebookEntity[];

  @ApiProperty()
  exercises!: ExerciseEntity[];

}
