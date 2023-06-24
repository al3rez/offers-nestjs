import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { IsString, IsBoolean, IsIn } from 'class-validator';

export enum OfferBoxSizeEnum {
  large = 'large',
  small = 'small',
}

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  name: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({ type: 'text' })
  @IsString()
  requirements: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  thumbnail: string;

  @Column({ type: 'varchar', length: 256, name: 'offer_url_template' })
  @IsString()
  offerUrlTemplate: string;

  @Column({ default: false, name: 'is_desktop' })
  @IsBoolean()
  isDesktop: boolean;

  @Column({ default: false, name: 'is_android' })
  @IsBoolean()
  isAndroid: boolean;

  @Column({ default: false, name: 'is_ios' })
  @IsBoolean()
  isIos: boolean;

  // @Column({ type: 'enum', enum: OfferBoxSizeEnum, name: 'box_size' })
  @Column({ name: 'box_size' })
  @IsIn(Object.values(OfferBoxSizeEnum))
  boxSize: OfferBoxSizeEnum;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'provider_name',
  })
  @IsString()
  providerName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'external_offer_id',
    nullable: true,
  })
  @IsString()
  externalOfferId: string;

  constructor(partial: Partial<Offer>) {
    Object.assign(this, partial);
  }
}

export type TransformedOffer = Omit<Offer, 'id' | 'slug' | 'providerName'>;
