import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PostContentDto {
    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}

export class CreatePostDto {
    @IsString()
    title: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PostContentDto)
    content?: PostContentDto;
}

export class UpdatePostDto {
    @IsString()
    title: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PostContentDto)
    content?: PostContentDto;
}