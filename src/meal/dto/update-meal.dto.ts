import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "src/auth/schemas/use.schema"
import { Category } from "src/meal/schema/meal.schema"


export class UpdateMealDto {

    @IsOptional()
    @IsString()
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, {message: 'Please enter correct category for this meal'})
    readonly category: Category

    @IsOptional()
    @IsString()
    readonly restaurant: string

    @IsEmpty({message: 'your cannot provide id'})
    readonly user: string
}