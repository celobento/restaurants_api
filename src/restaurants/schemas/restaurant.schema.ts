import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    FAST_FOOD = 'Fast Food',
    CAFE = 'Cafe',
    FINE_DINNER = 'Fine Dinner'
}

@Schema()
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
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
