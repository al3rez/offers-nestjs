import { Controller, Get, Param } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get(':offerProvider')
  findOne(@Param('offerProvider') offerProvider: string) {
    return this.offersService.findOne(offerProvider);
  }
}
