import { IsString, IsEmail, MinLength, IsDateString, IsPhoneNumber } from "class-validator";

export class CreateUserDTO {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @MinLength(6)
    repeatPassword: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsDateString()
    dateOfBirth: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    address: string;

    @IsPhoneNumber(null)
    phoneNumber: string;
}

export class UpdateUserDTO {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    address: string;

    @IsPhoneNumber(null)
    phoneNumber: string;
}