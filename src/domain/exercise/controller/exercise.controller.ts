import {
  Body,
  Controller, Get, HttpStatus, Logger, Param,
  Post, Query, Res, UploadedFile, UseInterceptors
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { ExerciseTypeEntity } from "../entities/exercise.type.entity";
import { ExerciseEntity } from "../entities/exercise.entity";
import { ExerciseRequestDto } from "../dto/exercise.request.dto";
import { ExercisePostureEntity } from "../entities/exercise.posture.entity";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@ApiTags("Exercise")
@Controller("exercise")
export class ExerciseController {

  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepository: EntityRepository<ExerciseEntity>,
              @InjectRepository(ExerciseTypeEntity) private readonly exerciseTypeRepository: EntityRepository<ExerciseTypeEntity>,
              @InjectRepository(ExercisePostureEntity) private readonly exercisePostureRepository: EntityRepository<ExercisePostureEntity>,
              @InjectRepository(PersonalProfileEntity) private readonly personalProfileRepository: EntityRepository<PersonalProfileEntity>,
              private configService: ConfigService) {
  }

  @Post()
  async createExerciseType(@Body() exerciseRequestDto: ExerciseRequestDto, @Res() res: Response) {
    let exerciseEntity = new ExerciseEntity();
    exerciseEntity.createdTime = DatetimeCommon.createDateAsUTC();
    exerciseEntity.exerciseType = await this.exerciseTypeRepository.findOne(exerciseRequestDto.exerciseType);
    const postures = await this.exercisePostureRepository.find(exerciseRequestDto.exercisePostures);
    for (let posture of postures) {
      exerciseEntity.postures.add(posture);
    }
    exerciseEntity.personalProfile = await this.personalProfileRepository.findOne(exerciseRequestDto.personalProfile)
    exerciseEntity.caloriesBurn = exerciseRequestDto.caloriesBurn;

    const entity = this.exerciseRepository.create(exerciseEntity);
    await this.exerciseRepository.persist(entity).flush();

    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));
  }

}
