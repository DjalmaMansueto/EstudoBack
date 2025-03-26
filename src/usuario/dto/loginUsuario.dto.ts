import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"


export class LoginUsuarioDTO{

    @IsEmail(undefined,{message: "email invalido" })
    email: string;

    @MinLength(6,{message: "senha deve ser no minimo 6 digitos"})
    senha: string;

}