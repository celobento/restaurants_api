import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
//import { AuthModule } from '../../src/auth/auth.module';
import { AuthModule } from 'src/auth/auth.module';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './schema/meal.schema';
//import { RestaurantsModule } from '../../src/restaurants/restaurants.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    RestaurantsModule,
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
