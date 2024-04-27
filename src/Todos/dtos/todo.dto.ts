import { IsBoolean, IsMongoId, IsString, MinLength } from "class-validator"
import { ObjectId } from "mongoose";


export class TodoDTO{

    @IsMongoId()
    _id: ObjectId

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    description: string;

    @IsBoolean()
    do:boolean;
}