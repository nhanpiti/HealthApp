import {
  Body,
  Controller, Get, HttpStatus, Logger, Param,
  Post, Query, Res
} from "@nestjs/common";
import { CustomerRequestDto } from "../dto/customer.request.dto";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { DatetimeCommon } from "../../../common/datetime.common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { CustomerEntity } from "../entities/customer.entity";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {

  private readonly logger = new Logger(CustomerController.name);

  constructor(@InjectRepository(CustomerEntity) private readonly repository: EntityRepository<CustomerEntity>,
              private configService: ConfigService) {
  }

  @Post()
  async create(@Body() customerRequestDto: CustomerRequestDto, @Res() res: Response) {

    if ( !customerRequestDto.phoneNumber || !customerRequestDto.name || !customerRequestDto.countryCode ) {
      res.status(HttpStatus.BAD_REQUEST).json(Object.assign({
        error: -1,
        message: 'Invalid data.'
      }));
      return;
    }

    const customer = await this.repository.findOne({
      phoneNumber: customerRequestDto.phoneNumber,
      countryCode: customerRequestDto.countryCode
    });

    if (customer) {
      res.status(HttpStatus.BAD_REQUEST).json(Object.assign({
        error: -1,
        message: 'Customer already exists.'
      }));
      return;
    }

    let customerEntity = new CustomerEntity();
    customerEntity.name = customerRequestDto.name;
    customerEntity.phoneNumber = customerRequestDto.phoneNumber;
    customerEntity.countryCode = customerRequestDto.countryCode;
    customerEntity.createdTime = DatetimeCommon.createDateAsUTC();
    const entity = this.repository.create(customerEntity);
    await this.repository.persist(entity).flush();
    res.status(HttpStatus.OK).json(Object.assign({
      data: entity,
      error: 1
    }));
  }

  @Get('get-by-phone-number')
  async getCustomerByPhoneNumber(@Query('phone_number') phoneNumber: string,
                                 @Query('country_code') countryCode: number, @Res() res: Response) {

    const customer = await this.repository.findOne({
      phoneNumber: phoneNumber,
      countryCode: countryCode
    });

    if (customer) {
      res.status(HttpStatus.OK).json(Object.assign({
        data: customer,
        error: 1
      }));
    } else {
      res.status(HttpStatus.NOT_FOUND).json(Object.assign({
        error: -1
      }));
    }

  }

}
