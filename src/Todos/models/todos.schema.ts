import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Todo extends Document {

    @Prop({required: true})
    name: String;

    @Prop()
    description: String;

    @Prop({default: false})
    do: Boolean;
}

export const todoSchema = SchemaFactory.createForClass(Todo)