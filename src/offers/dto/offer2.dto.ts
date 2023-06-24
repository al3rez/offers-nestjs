import { Exclude, Expose, Transform } from 'class-transformer';
import { OfferBoxSizeEnum } from '../entities/offer.entity';

const getProp =
  (fn: (offer2: Offer2Dto) => void) =>
  ({ obj }: { obj: Offer2Dto }) =>
    fn(obj);

// Offer2Dto
@Exclude()
export class Offer2Dto {
  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.campaign_id.toString()))
  externalOfferId: string;

  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.name))
  name: string;

  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.description))
  description: string;

  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.instructions))
  requirements: string;

  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.icon))
  thumbnail: string;

  @Expose()
  @Transform(getProp((offer2) => offer2.Offer.tracking_url))
  offerUrlTemplate: string;

  @Expose()
  @Transform(getProp((offer2) => !offer2.OS.android && !offer2.OS.ios))
  isDesktop: boolean;

  @Expose()
  @Transform(getProp((offer2) => offer2.OS.android))
  isAndroid: boolean;

  @Expose()
  @Transform(getProp((offer2) => offer2.OS.ios))
  isIos: boolean;

  @Expose()
  @Transform(() => OfferBoxSizeEnum.small)
  boxSize: OfferBoxSizeEnum;

  /**
   * these properties shouldn't be exposed,
   * they are only defined to be used for transforming exposed ones
   */
  Offer: {
    campaign_id: number;
    name: string;
    description: string;
    instructions: string;
    icon: string;
    tracking_url: string;
  };

  OS: {
    android: boolean;
    ios: boolean;
    web: boolean;
  };
}
