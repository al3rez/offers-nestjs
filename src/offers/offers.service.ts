import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Offer1Dto } from './dto/offer1.dto';
import { Offer2Dto } from './dto/offer2.dto';
import { payload as offer1Payload } from '../data/offer1.payload';
import { payload as offer2Payload } from '../data/offer2.payload';
import { validateOrReject } from 'class-validator';
import { Offer, TransformedOffer } from './entities/offer.entity';
import { v4 as uuidV4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const dto = {
  offer1: Offer1Dto,
  offer2: Offer2Dto,
};

const payloads = {
  offer1: offer1Payload,
  offer2: offer2Payload,
};

const extractors = {
  offer1: (payload) => payload.response.offers,
  offer2: (payload) => Object.values(payload.data)
};

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepo: Repository<Offer>) {}

  private async insertAndReturn(
    offerProvider: string,
    tOffers: TransformedOffer[],
  ) {
    const offers: Offer[] = [];

    for (const tOffer of tOffers) {
      const offer = {
        ...tOffer,
        slug: uuidV4(),
        providerName: offerProvider,
      };

      await validateOrReject(new Offer(offer));

      const existingOffer = await this.offerRepo.findOne({
        where: {
          externalOfferId: offer.externalOfferId,
          providerName: offer.providerName,
        },
      });

      if (existingOffer) {
        offers.push(existingOffer);
        continue;
      }

      const savedOffer = await this.offerRepo.save(offer);

      offers.push({
        id: savedOffer.id,
        ...offer,
      });
    }

    return offers;
  }

  async findOne(offerProvider: string) {
    if (!Object.keys(dto).includes(offerProvider)) {
      throw new NotFoundException();
    }

    const rawOffers = extractors[offerProvider](payloads[offerProvider]);

    const tOffers = rawOffers.map(
      (offer: {}) =>
        plainToClass(dto[offerProvider], offer) as TransformedOffer,
    );

    return this.insertAndReturn(offerProvider, tOffers);
  }
}
