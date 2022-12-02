import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SplashScreenController } from "./domain/splash.screen/controller/splash.screen.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MulterModule } from "@nestjs/platform-express";
import { SplashScreenEntity } from "./domain/splash.screen/entities/splash.screen.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { CustomerEntity } from "./domain/customer/entities/customer.entity";
import { PersonalProfileEntity } from "./domain/personal.profile/entities/personal.profile.entity";
import { MealEntity } from "./domain/meal/entities/meal.entity";
import { MealTypeEntity } from "./domain/meal/entities/meal.type.entity";
import { ExerciseEntity } from "./domain/exercise/entities/exercise.entity";
import { ExerciseTypeEntity } from "./domain/exercise/entities/exercise.type.entity";
import { ExercisePostureEntity } from "./domain/exercise/entities/exercise.posture.entity";
import { DiaryNotebookEntity } from "./domain/diary.notebook/entities/diary.notebook.entity";
import { HealthIndicatorEntity } from "./domain/health.indicator/entities/health.indicator.entity";
import { CustomerController } from "./domain/customer/controller/customer.controller";
import { MealTypeController } from "./domain/meal/controller/meal.type.controller";
import { MealController } from "./domain/meal/controller/meal.controller";
import { PersonalProfileController } from "./domain/personal.profile/controller/personal.profile.controller";
import { HealthIndicatorController } from "./domain/health.indicator/controller/health.indicator.controller";
import { DiaryNotebookController } from "./domain/diary.notebook/controller/diary.notebook.controller";
import { ExerciseTypeController } from "./domain/exercise/controller/exercise.type.controller";
import { ExercisePostureController } from "./domain/exercise/controller/exercise.posture.controller";
import { ExerciseController } from "./domain/exercise/controller/exercise.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.development.env',
    }),
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([SplashScreenEntity, CustomerEntity, PersonalProfileEntity, MealEntity, MealTypeEntity, ExerciseEntity, ExerciseTypeEntity, ExercisePostureEntity, DiaryNotebookEntity, HealthIndicatorEntity]),
    MulterModule.register({
      dest: 'uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
      serveRoot: '/public/'
    }),
  ],
  controllers: [SplashScreenController, ExerciseController, CustomerController, MealTypeController, MealController, ExerciseTypeController, PersonalProfileController, ExercisePostureController, HealthIndicatorController, DiaryNotebookController],
  providers: [],
})
export class AppModule {}
