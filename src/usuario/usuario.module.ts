import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenados } from "./usuario.dm";
import { EmailUnicoValidator } from "./validacao/email-unico-validator";
import { SenhaForte, strongPassValidator } from "./validacao/senha-forte.validator";

@Module({
imports:[],
controllers:[UsuarioController],
providers:[UsuarioArmazenados,EmailUnicoValidator,strongPassValidator],

})
export class UsuarioModule{}