import {
  Body,
  Controller, Get, HttpStatus, Logger, Param,
  Post, Query, Res
} from "@nestjs/common";
import { DiaryNotebookRequestDto } from "../dto/diary.notebook.request.dto";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { PersonalProfileEntity } from "../../personal.profile/entities/personal.profile.entity";
import { DiaryNotebookEntity } from "../entities/diary.notebook.entity";

@ApiTags("Diary Notebook")
@Controller("diary-notebook")
export class DiaryNotebookController {

  private readonly logger = new Logger(DiaryNotebookController.name);

  constructor(@InjectRepository(PersonalProfileEntity) private readonly personalProfileRepository: EntityRepository<PersonalProfileEntity>,
              @InjectRepository(DiaryNotebookEntity) private readonly healthIndicatorRepository: EntityRepository<DiaryNotebookEntity>,
              ) {
  }

  @Post()
  async create(@Body() diaryNotebookRequestDto: DiaryNotebookRequestDto, @Res() res: Response) {

    let personalProfile = await this.personalProfileRepository.findOne(diaryNotebookRequestDto.personalProfile);
    let diaryNotebookEntity = new DiaryNotebookEntity();
    diaryNotebookEntity.personalProfile = personalProfile;
    diaryNotebookEntity.title = diaryNotebookRequestDto.title;
    diaryNotebookEntity.description = diaryNotebookRequestDto.description;
    diaryNotebookEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.personalProfileRepository.create(diaryNotebookEntity);
    await this.personalProfileRepository.persist(entity).flush();
    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));

  }

}
