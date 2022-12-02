import {
  Body,
  Controller, Get, HttpStatus, Logger, Param,
  Post, Query, Res
} from "@nestjs/common";
import { PersonalProfileRequestDto } from "../dto/personal.profile.request.dto";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { PersonalProfileEntity } from "../entities/personal.profile.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { MealEntity } from "../../meal/entities/meal.entity";
import { PersonalProfileResponseDto } from "../dto/personal.profile.response.dto";
import { HealthIndicatorEntity } from "../../health.indicator/entities/health.indicator.entity";
import { DiaryNotebookEntity } from "../../diary.notebook/entities/diary.notebook.entity";
import { ExerciseEntity } from "../../exercise/entities/exercise.entity";

@ApiTags("PersonalProfile")
@Controller("personal-profile")
export class PersonalProfileController {

  private readonly logger = new Logger(PersonalProfileController.name);

  constructor(@InjectRepository(PersonalProfileEntity) private readonly personalProfileRepository: EntityRepository<PersonalProfileEntity>,
              @InjectRepository(CustomerEntity) private readonly customerRepository: EntityRepository<CustomerEntity>,
              @InjectRepository(MealEntity) private readonly mealRepository: EntityRepository<MealEntity>,
              @InjectRepository(HealthIndicatorEntity) private readonly healthIndicatorRepository: EntityRepository<HealthIndicatorEntity>,
              @InjectRepository(DiaryNotebookEntity) private readonly diaryNotebookRepository: EntityRepository<DiaryNotebookEntity>,
              @InjectRepository(ExerciseEntity) private readonly exerciseRepository: EntityRepository<ExerciseEntity>,
              private configService: ConfigService) {
  }

  @Post()
  async create(@Body() personalProfileRequestDto: PersonalProfileRequestDto, @Res() res: Response) {

    let customer = await this.customerRepository.findOne(personalProfileRequestDto.customer);

    let personalProfileEntity = new PersonalProfileEntity();
    personalProfileEntity.customer = customer;
    personalProfileEntity.weightUnit = personalProfileRequestDto.weightUnit;
    personalProfileEntity.calorieUnit = personalProfileRequestDto.calorieUnit;
    personalProfileEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.personalProfileRepository.create(personalProfileEntity);
    await this.personalProfileRepository.persist(entity).flush();
    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));
  }


  @Get(':id/range')
  async get(@Param('id') id: number, @Query('start_date') startDateStr: string, @Query('end_date') endDateStr: string, @Res() res: Response) {

    const personalProfile = await this.personalProfileRepository.findOne(id, { populate: ['customer'] });

    if (personalProfile) {

      let result = new PersonalProfileResponseDto();
      result.calorieUnit = personalProfile.calorieUnit;
      result.weightUnit = personalProfile.weightUnit;
      result.customer = personalProfile.customer;

      let startDate = DatetimeCommon.createDateFromString(startDateStr);
      let endDate = DatetimeCommon.createDateFromString(endDateStr);

      result.meals = await this.mealRepository.find({ $and: [
        { createdTime: { $gte: startDate }, },
        { createdTime: { $lte: endDate }, },
        { personalProfile: personalProfile.id }
      ]}, {
        orderBy: {
          createdTime: QueryOrder.ASC
        },
        populate: ['mealType']
      });

      for(let item of result.meals) {
        item.image = this.fillImageUrl(item.image);
        item.mealType.image = this.fillImageUrl(item.mealType.image);
      }

      result.healthIndicators = await this.healthIndicatorRepository.find({ $and: [
          { createdTime: { $gte: startDate }, },
          { createdTime: { $lte: endDate }, },
          { personalProfile: personalProfile.id }
        ]}, {
        orderBy: {
          createdTime: QueryOrder.ASC
        }
      });

      result.diaryNotebooks = await this.diaryNotebookRepository.find({ $and: [
          { createdTime: { $gte: startDate }, },
          { createdTime: { $lte: endDate }, },
          { personalProfile: personalProfile.id }
        ]}, {
        orderBy: {
          createdTime: QueryOrder.ASC
        }
      });

      result.exercises = await this.exerciseRepository.find({ $and: [
          { createdTime: { $gte: startDate }, },
          { createdTime: { $lte: endDate }, },
          { personalProfile: personalProfile.id }
        ]}, {
        orderBy: {
          createdTime: QueryOrder.ASC
        },
        populate: ['postures', 'exerciseType']
      });

      res.status(HttpStatus.OK).json(Object.assign({
        data: result,
        error: 1
      }));
    } else {
      res.status(HttpStatus.NOT_FOUND).json(Object.assign({
        error: -1
      }));
    }

  }

  fillImageUrl(image: string) {
    const url = this.configService.get<string>("URL");
    return url + "/public/" + image;
  }

}
