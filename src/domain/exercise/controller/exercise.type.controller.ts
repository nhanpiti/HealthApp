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

@ApiTags("ExerciseType")
@Controller("exercise-type")
export class ExerciseTypeController {

  constructor(@InjectRepository(ExerciseTypeEntity) private readonly repository: EntityRepository<ExerciseTypeEntity>,
              private configService: ConfigService) {
  }

  @Post()
  async createExerciseType(@Body() dataRequestDto: DataRequestDto, @Res() res: Response) {
    let exerciseTypeEntity = new ExerciseTypeEntity();
    exerciseTypeEntity.createdTime = DatetimeCommon.createDateAsUTC();
    exerciseTypeEntity.name = dataRequestDto.name;

    const entity = this.repository.create(exerciseTypeEntity);
    await this.repository.persist(entity).flush();

    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));
  }

  @Get('get-all')
  async getExerciseType(@Res() res: Response) {
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
