import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateCommentDto {
    @IsUUID()
    postId: string;

    @IsString()
    text: string;
}

export class UpdateCommentDto {
    @IsString()
    text: string;
}

export class GetCommentsDto {
    @IsUUID()
    postId: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}

