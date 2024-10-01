import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/use.schema";
import { Meal } from "src/meal/schema/meal.schema";

export enum Category {
    FAST_FOOD = 'Fast Food',
    CAFE = 'Cafe',
    FINE_DINNER = 'Fine Dinner'
}

@Schema({
    timestamps: true
})
export class Restaurant {

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    email: string

    @Prop()
    phoneNumber: string

    @Prop()
    address: string

    @Prop()
    category: Category

    @Prop()
    images?: Object[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }])
    menu?: Meal[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
