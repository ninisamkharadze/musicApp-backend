import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsUrl()
    image: string;
}