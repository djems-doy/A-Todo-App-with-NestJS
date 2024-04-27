import { IsBoolean, IsString, MinLength } from "class-validator"

export class CreateTodoDTO{

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    description: string;

    @IsBoolean()
    do:boolean;
}