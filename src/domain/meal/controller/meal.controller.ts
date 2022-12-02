import {
  Body,
  Controller, Get, HttpStatus,
  Post, Query, Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { diskStorage } from "multer";
import { editFileName, imageFilter } from "../../../common/file.common";
import { MealTypeEntity } from "../entities/meal.type.entity";
import { MealEntity } from "../entities/meal.entity";
import { MealRequestDto } from "../dto/meal.request.dto";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";
import { MealResponseDto } from "../dto/meal.response.dto";

@ApiTags("Meal")
@Controller("meal")
export class MealController {

  constructor(@InjectRepository(MealEntity) private readonly mealRepository: EntityRepository<MealEntity>,
              @InjectRepository(MealTypeEntity) private readonly mealTypeRepository: EntityRepository<MealTypeEntity>,
              @InjectRepository(PersonalProfileEntity) private readonly personalProfileRepository: EntityRepository<PersonalProfileEntity>,
              private configService: ConfigService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
    fileFilter: imageFilter
  }))
  @ApiConsumes("multipart/form-data")
  async createMeal(@Body() mealRequestDto: MealRequestDto,
                           @UploadedFile() file: Express.Multer.File, @Res() res: Response) {

    const mealType = await this.mealTypeRepository.findOne(mealRequestDto.mealType);

    const personalProfile = await this.personalProfileRepository.findOne(mealRequestDto.personalProfile);

    let mealEntity = new MealEntity();
    mealEntity.mealType = mealType;
    mealEntity.personalProfile = personalProfile;
    mealEntity.image = file.filename;

    mealEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.mealRepository.create(mealEntity);
    await this.mealRepository.persist(entity).flush();

    let result = new MealResponseDto();
    result.id = entity.id;
    this.fillImageUrl(result, entity);

    res.status(HttpStatus.OK).json(Object.assign({
      data: result,
      error: 1
    }));
  }

  @Get('get-by-personal-profile')
  async getMeals(@Query('personal_profile') personalProfile: number, @Res() res: Response) {
    const entities = await this.mealRepository.find({
      personalProfile: personalProfile
    }, {
      orderBy: {
        createdTime: QueryOrder.DESC
      }
    });

    let result = [];
    for (let entity of entities) {
      let item = new MealResponseDto();
      item.id = entity.id;
      this.fillImageUrl(item, entity);
      result.push(item);
    }

    res.status(HttpStatus.OK).json(Object.assign({
      data: result,
      error: 1
    }));
  }

  fillImageUrl(dto: MealResponseDto, entity: MealEntity) {
    const url = this.configService.get<string>("URL");
    dto.fileUrl = url + "/public/" + entity.image;
  }


}
