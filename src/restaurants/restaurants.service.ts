import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as  mongoose from 'mongoose'

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ){}

    // get all restaurant => GET /restaurant
    async findAll(): Promise<Restaurant[]> {

        const restaurants = await this.restaurantModel.find();
        return restaurants;

    }

    // create new restaurant => POST /restaurants
    async create(restaurant: Restaurant): Promise<Restaurant> {
        const res = await this.restaurantModel.create(restaurant)
        return res
    }
}
