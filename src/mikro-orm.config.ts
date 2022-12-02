import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { SplashScreenEntity } from "./domain/splash.screen/entities/splash.screen.entity";
import { CustomerEntity } from "./domain/customer/entities/customer.entity";
import { PersonalProfileEntity } from "./domain/personal.profile/entities/personal.profile.entity";
import { MealEntity } from "./domain/meal/entities/meal.entity";
import { MealTypeEntity } from "./domain/meal/entities/meal.type.entity";
import { ExerciseEntity } from "./domain/exercise/entities/exercise.entity";
import { ExerciseTypeEntity } from "./domain/exercise/entities/exercise.type.entity";
import { ExercisePostureEntity } from "./domain/exercise/entities/exercise.posture.entity";
import { DiaryNotebookEntity } from "./domain/diary.notebook/entities/diary.notebook.entity";
import { HealthIndicatorEntity } from "./domain/health.indicator/entities/health.indicator.entity";

const config: Options = {
  entities: [SplashScreenEntity, CustomerEntity, PersonalProfileEntity, MealEntity, MealTypeEntity, ExerciseEntity, ExerciseTypeEntity, ExercisePostureEntity, DiaryNotebookEntity, HealthIndicatorEntity],
  dbName: 'db/health_app.sqlite3',
  type: 'sqlite',
  highlighter: new SqlHighlighter(),
  migrations: {
    path: './migrations'
  }
};
export default config;
