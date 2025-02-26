import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class criaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome:string;

    @IsInt()
    idade: Number;

    @IsString()
    cidade: string;

    @IsEmail(undefined,{message:"email é invalido"})
    email: string;

    @IsString()
    telefone: string;
    @MinLength(6,{message:"Senha precisa de pelo menos 6 digitos"})
    senha: string;

}