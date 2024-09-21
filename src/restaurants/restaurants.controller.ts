import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService){}
    
    @Get()
    @UseGuards(AuthGuard())
    async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query);
    }

    @Post()
    async createRestaurant(
        @Body() restaurant: CreateRestaurantDto
    ): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant)

    }

    @Get(':id')
    async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
        return this.restaurantsService.findById(id)
    }

    @Put(':id')
    async updateRestaurant(@Param('id') id: string, @Body() restaurant: UpdateRestaurantDto): Promise<Restaurant> {
        // first I search by ID to confirm that this exists
        await this.restaurantsService.findById(id)

        return this.restaurantsService.updateById(id, restaurant)
        
    }

    @Delete(':id')
    async deleteRestaurant(@Param('id') id: string): Promise<{deleted: Boolean}> {
        // first I search by ID to confirm that this exists
        const restaurant = await this.restaurantsService.findById(id)

        const isDeleted = this.restaurantsService.deleteImages(restaurant.images)

        if(isDeleted) {
            this.restaurantsService.deleteById(id)
            return {
                deleted: true
            }
        } else {
            return {
                deleted: false
            }
        }

        
    }
    
    // to unique upload
    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string
    ) {
        console.log(id + " | " + file);
    }
    
    // to mult upload
    @Put('uploads/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Param('id') id: string
    ) {
        //console.log(id + " | " + files);
        await this.restaurantsService.findById(id)

        const res = await this.restaurantsService.uploadImages(id, files)
        return res
    }

}
