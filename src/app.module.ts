import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { OffersModule } from './offers/offers.module';

const sqliteDbPath = join(__dirname, '..', 'sqlite-db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: sqliteDbPath,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    OffersModule,
  ],
})
export class AppModule {}
