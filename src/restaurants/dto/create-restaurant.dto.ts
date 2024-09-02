import { Category } from "../schemas/restaurant.schema"

export class CreateRestaurantDto {
    readonly name: string
    readonly description: string
    readonly email: string
    readonly phoneNumber: number
    readonly address: string
    readonly category: Category;
}