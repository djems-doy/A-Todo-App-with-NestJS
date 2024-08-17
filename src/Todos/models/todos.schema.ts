import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Todo extends Document {

    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    description: string;

    @Prop({default: ""})
    category: string;
    
    @Prop({default: Date.now(), required: true})
    startDate: Date;

    @Prop({required: true})
    endDate: Date;

    @Prop({default: false})
    do: boolean;
}

export const todoSchema = SchemaFactory.createForClass(Todo)