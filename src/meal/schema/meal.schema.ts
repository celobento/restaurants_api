import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  * as mongoose  from "mongoose";

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
    restaurant: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: string

}

export const MealSchema = SchemaFactory.createForClass(Meal)