import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArtistDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNumber()
    @IsInt()
    age: number;
}
