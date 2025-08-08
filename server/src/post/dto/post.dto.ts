import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class PostContentDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'text',
        example: 'Ovo je sadržaj posta.',
        required: false,
    })
    text?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'imageUrl',
        example: 'https://example.com/image.png',
        required: false,
    })
    imageUrl?: string;
}


export class CreatePostDto {
    @IsString()
    @ApiProperty({
        description: 'title',
        example: 'Naslov mog posta',
    })
    title: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PostContentDto)
    @ApiProperty({
        description: 'content',
        type: () => PostContentDto,
        required: false,
    })
    content?: PostContentDto;
}

export class UpdatePostDto {
    @IsString()
    @ApiProperty({
        description: 'title',
        example: 'Izmenjen naslov posta',
    })
    title: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PostContentDto)
    @ApiProperty({
        description: 'content',
        type: () => PostContentDto,
        required: false,
    })
    content?: PostContentDto;
}