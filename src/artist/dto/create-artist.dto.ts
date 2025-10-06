import { url } from "aws-sdk/clients/finspace";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

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
