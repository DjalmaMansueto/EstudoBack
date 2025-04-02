import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico-validator";
import { ApiProperty } from "@nestjs/swagger";

export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    @ApiProperty({
        example: 'Djalma Mansueto',
        description: 'Esse campo vai ser utilizado como identificação do usuario'
    })
    nome:string;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        example: 22,
        description:' este campo identifica a idade do usuario'
    })
    idade: Number;

    // @IsString()
    // @IsOptional()
    // @ApiProperty({
    //     example: 'Bauru',
    //     description:'deve ser enviado apenas o nome da cidade'
    // })
    // cidade: string;

    @IsEmail(undefined,{message:"email é invalido"})
    @EmailUnico({message:"email já cadastrado. Tente novamente"})
    @IsOptional()
    @ApiProperty({
        example: 'djalma.mansueto@gmail.com',
        description: 'deve conter apenas email do usuario'
    })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '14-991100370',
        description: 'deve constar numero de telefone do usuario '
    })
    telefone: string;

    @MinLength(6,{message:"Senha precisa de pelo menos 6 digitos"})
    @IsOptional()
    @ApiProperty({
        example:'Kjszkjk01@',
        description:'a senha deve conter letras Maiuscolas, minuscolas, numeros e caracteres'
    })
    senha: string;
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '17020050',
    description: 'Deve ser enviado CEP valido'

    })
    cep: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Apartamento, bloco, lote',
    description: 'deve ser informado o complemento do endereço'

    })
    complemento: string;

}