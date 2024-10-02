import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../src/auth/decorators/current-user.decorator';
import { User } from '../../src/auth/schemas/use.schema';
import { RolesGuard } from '../../src/auth/guards/roles.guard';
import { Roles } from '../../src/auth/decorators/roles.decorator';
@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService){}
    
    @Get()
    @UseGuards(AuthGuard())
    async getAllRestaurants(
        @Query() query: ExpressQuery,
        //@Req() req
        @CurrentUser() user: User
    ): Promise<Restaurant[]> {
        console.log(user)
        return this.restaurantsService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('admin', "user")
    async createRestaurant(
        @Body() restaurant: CreateRestaurantDto,
        @CurrentUser() user: User
    ): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant, user)

    }

    @Get(':id')
    async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
        return this.restaurantsService.findById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateRestaurant(
        @Param('id') id: string, 
        @Body() restaurant: UpdateRestaurantDto,
        @CurrentUser() user: User): Promise<Restaurant> {
        // first I search by ID to confirm that this exists
        const rest = await this.restaurantsService.findById(id)

        if(rest.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You can not update this restaurant')
        }

        return this.restaurantsService.updateById(id, restaurant)
        
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteRestaurant(
        @Param('id') id: string,
        @CurrentUser() user: User): Promise<{deleted: Boolean}> {
        // first I search by ID to confirm that this exists
        const rest = await this.restaurantsService.findById(id)

        if(rest.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You can not delete this restaurant')
        }


        const isDeleted = this.restaurantsService.deleteImages(rest.images)

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
