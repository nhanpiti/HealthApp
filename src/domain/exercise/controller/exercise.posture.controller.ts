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
import { DataRequestDto } from "../dto/data.request.dto";
import { ExercisePostureEntity } from "../entities/exercise.posture.entity";

@ApiTags("ExercisePosture")
@Controller("exercise-posture")
export class ExercisePostureController {

  constructor(@InjectRepository(ExercisePostureEntity) private readonly repository: EntityRepository<ExercisePostureEntity>,
              private configService: ConfigService) {
  }

  @Post()
  async createExercisePosture(@Body() dataRequestDto: DataRequestDto, @Res() res: Response) {
    let exercisePostureEntity = new ExercisePostureEntity();
    exercisePostureEntity.createdTime = DatetimeCommon.createDateAsUTC();
    exercisePostureEntity.name = dataRequestDto.name;

    const entity = this.repository.create(exercisePostureEntity);
    await this.repository.persist(entity).flush();

    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));
  }

  @Get('get-all')
  async getExercisePosture(@Res() res: Response) {
    const entities = await this.repository.find({
      id: { $gt: 0 }
    }, {
      orderBy: {
        createdTime: QueryOrder.ASC
      }
    });

    res.status(HttpStatus.OK).json(Object.assign({
      data: entities,
      error: 1
    }));
  }

}
