import { IsEmail, isEmail, IsEmpty, IsEnum, IsOptional, IsPhoneNumber, IsString, ValidationArguments } from "class-validator"
import { Category } from "../schemas/restaurant.schema"
import { BadRequestException, InternalServerErrorException } from "@nestjs/common"
import { User } from "src/auth/schemas/use.schema"

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

    
    //@IsPhoneNumber('US', {
    //    message: (args: ValidationArguments) => {
    //        if (args.value.length !== 15) {
    //            throw new BadRequestException(`${args.value} Wrong Phone Number`);
    //        } else {
    //            throw new InternalServerErrorException();
    //        }
    //    },
    //})
    @IsOptional()
    readonly phoneNumber: string

    @IsString()
    @IsOptional()
    readonly address: string

    @IsEnum(Category)
    @IsOptional()
    readonly category: Category;

    @IsEmpty({ message: 'You cannot provide the user ID.'})
    readonly user: User;
}