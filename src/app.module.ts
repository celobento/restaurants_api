import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from "@nestjs/mongoose"
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URI_LOCAL), 
    RestaurantsModule, AuthModule, MealModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
