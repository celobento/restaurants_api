import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/auth/schemas/use.schema"
import { Category } from "src/restaurants/schemas/restaurant.schema"


export class CreateMealDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(Category, {message: 'Please enter correct category for this meal'})
    readonly category: Category

    @IsNotEmpty()
    @IsString()
    readonly restaurant: string

    @IsEmpty({message: 'your cannot provide id'})
    readonly user: User
}