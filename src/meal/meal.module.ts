import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './schema/meal.schema';
import { AuthModule } from '../../src/auth/auth.module';
import { RestaurantsModule } from '../../src/restaurants/restaurants.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Meal', schema: MealSchema}
    ]),
    RestaurantsModule
  ],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}
