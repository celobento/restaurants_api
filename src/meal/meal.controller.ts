import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from './schema/meal.schema';
import { CreateMealDto } from './dto/meal.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/use.schema';

@Controller('meals')
export class MealController {
    constructor(private mealService: MealService){}

    @Get()
    getAll(): Promise<Meal[]> {
        return this.mealService.getAll()
    }

    @Get('restaurant/:id')
    getMealByRestaurant(@Param('id') id: string): Promise<Meal[]> {
        return this.mealService.findByRestaurant(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    createMeal(
        @Body() createMealDto: CreateMealDto,
        @CurrentUser() user: User
    ): Promise<Meal>{
        return this.mealService.create(createMealDto, user)
    }
}
