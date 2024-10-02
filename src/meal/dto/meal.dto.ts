import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../../meal/schema/meal.schema"


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
    readonly user: string
}