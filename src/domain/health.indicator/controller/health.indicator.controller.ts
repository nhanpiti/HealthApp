import {
  Body,
  Controller, Get, HttpStatus, Logger, Param,
  Post, Query, Res
} from "@nestjs/common";
import { HealthIndicatorRequestDto } from "../dto/health.indicator.request.dto";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { HealthIndicatorEntity } from "../entities/health.indicator.entity";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";

@ApiTags("Health Indicator")
@Controller("health-indicator")
export class HealthIndicatorController {

  private readonly logger = new Logger(HealthIndicatorController.name);

  constructor(@InjectRepository(PersonalProfileEntity) private readonly personalProfileRepository: EntityRepository<PersonalProfileEntity>,
              @InjectRepository(HealthIndicatorEntity) private readonly healthIndicatorRepository: EntityRepository<HealthIndicatorEntity>,
              ) {
  }

  @Post()
  async create(@Body() healthIndicatorRequestDto: HealthIndicatorRequestDto, @Res() res: Response) {

    let personalProfile = await this.personalProfileRepository.findOne(healthIndicatorRequestDto.personalProfile);
    let healthIndicatorEntity = new HealthIndicatorEntity();
    healthIndicatorEntity.personalProfile = personalProfile;
    healthIndicatorEntity.fatRatio = healthIndicatorRequestDto.fatRatio;
    healthIndicatorEntity.weight = healthIndicatorRequestDto.weight;
    healthIndicatorEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.healthIndicatorRepository.create(healthIndicatorEntity);
    await this.healthIndicatorRepository.persist(entity).flush();
    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));

  }

}
