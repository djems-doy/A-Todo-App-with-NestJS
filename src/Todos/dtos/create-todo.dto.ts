import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class CreateTodoDTO{

    @IsString()
    @MinLength(4)
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;
    
    @IsNotEmpty()
    // @IsDate()
    startDate: Date;

    @IsNotEmpty()
    // @IsDate()
    endDate: Date;

    @IsOptional()
    @IsBoolean()
    do:boolean;
}