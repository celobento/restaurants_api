import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, ValidationArguments } from "class-validator"
import { Category } from "../schemas/restaurant.schema"
import { BadRequestException, InternalServerErrorException } from "@nestjs/common"
import { User } from "src/auth/schemas/use.schema"

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
    //@IsPhoneNumber('US', {
    //    message: (args: ValidationArguments) => {
    //        if (args.value.length !== 15) {
    //            throw new BadRequestException(`${args.value} Wrong Phone Number`);
    //        } else {
    //            throw new InternalServerErrorException();
    //        }
    //    },
    //})
    readonly phoneNumber: string
    
    @IsNotEmpty()
    @IsString()
    readonly address: string
    
    @IsNotEmpty()
    @IsEnum(Category, {message : 'Plase enter correct category'})
    readonly category: Category;

    @IsEmpty({ message: 'You cannot provide the user ID.'})
    readonly user: User;
}