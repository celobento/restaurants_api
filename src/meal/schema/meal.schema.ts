import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "aws-sdk/clients/budgets";
import  * as mongoose  from "mongoose";
import { Restaurant } from "src/restaurants/schemas/restaurant.schema";

export enum Category {
    SOUP = 'Soup',
    SALADS = 'Salads',
    SANDDWICHES = 'Sandwiches',
    PASTA = 'Pasta'
}

@Schema({
    timestamps: true
})
export class Meal {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    price: number

    @Prop()
    category: Category

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: Restaurant

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

}

export const MealSchema = SchemaFactory.createForClass(Meal)