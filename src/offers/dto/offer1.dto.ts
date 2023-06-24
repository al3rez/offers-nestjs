import { Exclude, Expose, Transform } from 'class-transformer';
import { OfferBoxSizeEnum } from '../entities/offer.entity';

const isOS =
  (os: 'desktop' | 'android' | 'ios') =>
  ({ obj: { platform, device } }: { obj: Offer1Dto }) => {
    if (platform === 'desktop') return os === 'desktop';

    if (device.includes('ipad') || device.includes('iphone'))
      return os === 'ios';

    return os === 'android';
  };

// Offer1Dto
@Exclude()
export class Offer1Dto {
  @Expose({ name: 'offer_id' })
  externalOfferId: string;

  @Expose({ name: 'offer_name' })
  name: string;

  @Expose({ name: 'offer_desc' })
  description: string;

  @Expose({ name: 'call_to_action' })
  requirements: string;

  @Expose({ name: 'image_url' })
  thumbnail: string;

  @Expose({ name: 'offer_url' })
  offerUrlTemplate: string;

  @Expose()
  @Transform(isOS('desktop'))
  isDesktop: boolean;

  @Expose()
  @Transform(isOS('android'))
  isAndroid: boolean;

  @Expose()
  @Transform(isOS('ios'))
  isIos: boolean;

  @Expose()
  @Transform(() => OfferBoxSizeEnum.small)
  boxSize: OfferBoxSizeEnum;

  /**
   * these properties shouldn't be exposed,
   * they are only defined to be used for transforming exposed ones
   */
  platform: string;
  device: string;
}
