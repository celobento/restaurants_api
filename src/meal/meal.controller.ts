import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from './schema/meal.schema';
import { CreateMealDto } from './dto/meal.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/use.schema';
import { UpdateMealDto } from './dto/update-meal.dto';

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

    @Get(':id')
    getMealById(@Param('id') id: string): Promise<Meal> {
        return this.mealService.findById(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    createMeal(
        @Body() createMealDto: CreateMealDto,
        @CurrentUser() user: User
    ): Promise<Meal>{
        return this.mealService.create(createMealDto, user)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateMeal(@Body() updateMealDto: UpdateMealDto, @Param('id') id: string, @CurrentUser() user: User): Promise<Meal> {
        const meal = await this.mealService.findById(id)
        if(meal.user.toString() != user._id.toString()) {
            throw new ForbiddenException('You can not update this meal')
        }
        return this.mealService.updateMeal(id, updateMealDto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteMeal(@Param('id') id: string, @CurrentUser() user: User): Promise<{deleted: boolean}> {
        const meal = await this.mealService.findById(id)
        if(meal.user.toString() != user._id.toString()) {
            throw new ForbiddenException('You can not update this meal')
        }
        return this.mealService.deleteMeal(id)
    }
}
