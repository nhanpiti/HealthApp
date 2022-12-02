import {
  Body,
  Controller, Get, HttpStatus,
  Post, Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MealTypeRequestDto } from "../dto/meal.type.request.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { MealTypeResponseDto } from "../dto/meal.type.response.dto";
import { diskStorage } from "multer";
import { editFileName, imageFilter } from "../../../common/file.common";
import { MealTypeEntity } from "../entities/meal.type.entity";

@ApiTags("Meal type")
@Controller("meal-type")
export class MealTypeController {

  constructor(@InjectRepository(MealTypeEntity) private readonly repository: EntityRepository<MealTypeEntity>,
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
  async createMealType(@Body() mealTypeRequestDto: MealTypeRequestDto,
                           @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    let mealTypeEntity = new MealTypeEntity();
    mealTypeEntity.image = file.filename;
    mealTypeEntity.createdTime = DatetimeCommon.createDateAsUTC();
    mealTypeEntity.name = mealTypeRequestDto.name;

    const entity = this.repository.create(mealTypeEntity);
    await this.repository.persist(entity).flush();

    let result = new MealTypeResponseDto();
    result.id = entity.id;
    result.name = entity.name;
    this.fillImageUrl(result, entity);

    res.status(HttpStatus.OK).json(Object.assign({
      data: result,
      error: 1
    }));
  }

  @Get('get-all')
  async getMealTypes(@Res() res: Response) {
    const entities = await this.repository.find({
      id: { $gt: 0 }
    }, {
      orderBy: {
        createdTime: QueryOrder.ASC
      }
    });

    let result = [];
    for (let entity of entities) {
      let item = new MealTypeResponseDto();
      item.id = entity.id;
      item.name = entity.name;
      this.fillImageUrl(item, entity);
      result.push(item);
    }

    res.status(HttpStatus.OK).json(Object.assign({
      data: result,
      error: 1
    }));
  }

  fillImageUrl(dto: MealTypeResponseDto, entity: MealTypeEntity) {
    const url = this.configService.get<string>("URL");
    dto.fileUrl = url + "/public/" + entity.image;
  }


}
