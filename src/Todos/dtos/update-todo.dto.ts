import { IsBoolean, IsDate, IsString, MinLength } from "class-validator"

export class updateTodoDTO{

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    description: string;

    @IsString()
    category: string;
    
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsBoolean()
    do:boolean;
}