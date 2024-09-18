import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"
import { Category } from "../schemas/restaurant.schema"

export class CreateRestaurantDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string
    
    @IsNotEmpty()
    @IsString()
    readonly description: string
    
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter a correct email address'})
    readonly email: string

    @IsNotEmpty()
    @IsPhoneNumber('US')
    readonly phoneNumber: number
    
    @IsNotEmpty()
    @IsString()
    readonly address: string
    
    @IsNotEmpty()
    @IsEnum(Category, {message : 'Plase enter correct category'})
    readonly category: Category;
}