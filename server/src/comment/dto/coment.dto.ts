import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @IsUUID()
    @ApiProperty({
        description: 'postId',
        example: '9a112ef0-1234-4a45-b123-0cbcc0a29c15',
    })
    postId: string;

    @IsString()
    @ApiProperty({
        description: 'text',
        example: 'This is a comment.',
    })
    text: string;
}

export class UpdateCommentDto {
    @IsString()
    @ApiProperty({
        description: 'text',
        example: 'Izmenjen tekst komentara.',
    })
    text: string;
}

export class GetCommentsDto {
    @IsUUID()
    @ApiProperty({
        description: 'postId',
        example: '9a112ef0-1234-4a45-b123-0cbcc0a29c15',
    })
    postId: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: 'offset',
        example: 0,
        required: false,
    })
    offset?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiProperty({
        description: 'limit',
        example: 10,
        required: false,
    })
    limit?: number = 10;
}

