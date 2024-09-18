import { IsEmail, isEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { Category } from "../schemas/restaurant.schema"

export class UpdateRestaurantDto {

    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly description: string

    @IsEmail()
    @IsOptional()
    readonly email: string

    @IsPhoneNumber('US')
    @IsOptional()
    readonly phoneNumber: number

    @IsString()
    @IsOptional()
    readonly address: string

    @IsEnum(Category)
    @IsOptional()
    readonly category: Category;
}