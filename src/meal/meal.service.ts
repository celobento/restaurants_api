import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schema/meal.schema';
import  * as mongoose  from 'mongoose';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';
import { User } from 'src/auth/schemas/use.schema';

@Injectable()
export class MealService {
    constructor(
        @InjectModel(Meal.name)
        private mealModel: mongoose.Model<Meal>,
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>,
    ){}

    async getAll(): Promise<Meal[]> {
        const meals = await this.mealModel.find()
        return meals
    }

    async findByRestaurant(id: string): Promise<Meal[]> {
        const meal = await this.mealModel.find({restaurant: id})
        return meal
    }

    // create a new meal => POST /meals/:restaurant
    async create(meal: Meal, user: User): Promise<Meal> {
        const data = Object.assign(meal, { user: user._id})
        
        //saving meal ID in the restaurant menu
        console.log(meal.restaurant)
        const restaurant = await this.restaurantModel.findById(meal.restaurant)
        console.log(restaurant)
        if(!restaurant) {
            throw new NotFoundException('Restaurant not found with this id')
        }
        
        // check ownership of the restaurant
        if(restaurant.user.toString() != user._id.toString()) {
            throw new ForbiddenException('You can not add meal to this restaurant')
        }

        const mealCreated = await this.mealModel.create(data)
        
        restaurant.menu.push(mealCreated)
        await restaurant.save()
        return mealCreated
    }

    async findById(id: string): Promise<Meal> {
        const isValidId = mongoose.isValidObjectId(id)
        if(!isValidId){
            throw new BadRequestException('Wrong mongoose ID error.')
        }
        const meal = await this.mealModel.findById(id)
        if(!meal){
            throw new NotFoundException('Meal not found with this ID')
        }
        return meal
    }

    async updateMeal(id: string, meal: Meal): Promise<Meal>{
        return await this.mealModel.findByIdAndUpdate(id, meal, {
            new: true,
            runValidators: true
        })
    }

    async deleteMeal(id: string): Promise<{deleted : boolean}>{
        const res = await this.mealModel.findByIdAndDelete(id)
        if(res) return { deleted: true}
        return { deleted: false}
    }
}
