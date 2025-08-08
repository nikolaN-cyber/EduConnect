import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, IsDateString, IsPhoneNumber } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @ApiProperty({ description: 'username', example: 'nikola123' })
    username: string;

    @IsEmail()
    @ApiProperty({ description: 'email', example: 'nikola@example.com' })
    email: string;

    @MinLength(6)
    @ApiProperty({ description: 'password', example: 'securePass123' })
    password: string;

    @MinLength(6)
    @ApiProperty({ description: 'repeatPassword', example: 'securePass123' })
    repeatPassword: string;

    @IsString()
    @ApiProperty({ description: 'firstName', example: 'Nikola' })
    firstName: string;

    @IsString()
    @ApiProperty({ description: 'lastName', example: 'Nikolić' })
    lastName: string;

    @IsDateString()
    @ApiProperty({ description: 'dateOfBirth', example: '1995-08-01' })
    dateOfBirth: string;

    @IsString()
    @ApiProperty({ description: 'country', example: 'Srbija' })
    country: string;

    @IsString()
    @ApiProperty({ description: 'city', example: 'Beograd' })
    city: string;

    @IsString()
    @ApiProperty({ description: 'address', example: 'Nemanjina 4' })
    address: string;

    @IsPhoneNumber(null)
    @ApiProperty({ description: 'phoneNumber', example: '+381641234567' })
    phoneNumber: string;
}

export class UpdateUserDTO {
    @IsString()
    @ApiProperty({ description: 'username', example: 'nikola_updated' })
    username: string;

    @IsEmail()
    @ApiProperty({ description: 'email', example: 'nikola.updated@example.com' })
    email: string;

    @IsString()
    @ApiProperty({ description: 'firstName', example: 'Nikola' })
    firstName: string;

    @IsString()
    @ApiProperty({ description: 'lastName', example: 'Nikolić' })
    lastName: string;

    @IsString()
    @ApiProperty({ description: 'country', example: 'Srbija' })
    country: string;

    @IsString()
    @ApiProperty({ description: 'city', example: 'Novi Sad' })
    city: string;

    @IsString()
    @ApiProperty({ description: 'address', example: 'Bulevar Oslobođenja 1' })
    address: string;

    @IsPhoneNumber(null)
    @ApiProperty({ description: 'phoneNumber', example: '+381601112223' })
    phoneNumber: string;
}

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        description: 'email',
        example: 'user@example.com',
    })
    email: string;

    @MinLength(6)
    @ApiProperty({
        description: 'password',
        example: 'securePassword123',
    })
    password: string;
}