import {
  Body,
  Controller, Get, HttpStatus,
  Post, Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SplashScreenRequestDto } from "../dto/splash.screen.request.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SplashScreenEntity } from "../entities/splash.screen.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { SplashScreenResponseDto } from "../dto/splash.screen.response.dto";
import { diskStorage } from "multer";
import { editFileName, imageFilter } from "../../../common/file.common";

@ApiTags("Splash Screen")
@Controller("splash-screen")
export class SplashScreenController {

  constructor(@InjectRepository(SplashScreenEntity) private readonly repository: EntityRepository<SplashScreenEntity>,
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
  async uploadSplashScreen(@Body() splashScreenRequestDto: SplashScreenRequestDto,
                           @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    let splashScreenEntity = new SplashScreenEntity();
    splashScreenEntity.name = splashScreenRequestDto.name;
    splashScreenEntity.fileName = file.filename;
    splashScreenEntity.mimetype = file.mimetype;

    splashScreenEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.repository.create(splashScreenEntity);
    await this.repository.persist(entity).flush();

    let result = new SplashScreenResponseDto();
    result.id = entity.id;

    this.fillImageUrl(result, entity);

    res.status(HttpStatus.OK).json(Object.assign({
      data: result,
      error: 1
    }));
  }

  @Get()
  async getSplashScreen(@Res() res: Response) {
    const entity = await this.repository.findOne({
      id: { $gt: 0 }
    }, {
      orderBy: {
        createdTime: QueryOrder.DESC
      }
    });

    if (entity) {
      let result = new SplashScreenResponseDto();
      result.id = entity.id;

      this.fillImageUrl(result, entity);

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

  fillImageUrl(dto: SplashScreenResponseDto, entity: SplashScreenEntity) {
    const url = this.configService.get<string>("URL");
    dto.fileUrl = url + "/public/" + entity.fileName;
  }


}
