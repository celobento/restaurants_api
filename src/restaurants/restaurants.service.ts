import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';
import * as mongoose from 'mongoose';

import { User } from '../../src/auth/schemas/use.schema';
import APIFeatures from '../utils/apiFeatures.util';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // get all restaurant => GET /restaurant
  async findAll(query: ExpressQuery): Promise<Restaurant[]> {
    const resPerPage = 2;
    const currentpage = Number(query.page) || 1;
    const skip = resPerPage * (currentpage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const restaurants = await this.restaurantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return restaurants;
  }

  // create new restaurant => POST /restaurants
  async create(restaurant: Restaurant, user: User): Promise<Restaurant> {
    const data = Object.assign(restaurant, { user: user._id });
    const res = await this.restaurantModel.create(data);
    return res;
  }

  // Get a restaurant by ID => GET /restaurant/:id
  async findById(id: string): Promise<Restaurant> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong ID');
    }

    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('REstaurant not found. Id: ' + id);
    }

    return restaurant;
  }

  // Update restaurant by ID => PUT /restaurant/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a restaurant by ID => DELETE /restaurant/:id
  async deleteById(id: String): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(id);
  }

  // upload images => PUT /restaurant/uploads/:id
  async uploadImages(id, files) {
    const images = await APIFeatures.upload(files);
    //console.log(images)
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      {
        images: images as Object[],
      },
      {
        new: true,
        runValidators: true,
      },
    );
    //return images
    return restaurant;
  }

  async deleteImages(images) {
    // if restaurant dont have any image
    if (images.length === 0) return true;
    const res = await APIFeatures.deleteImages(images);
    return res;
  }
}
