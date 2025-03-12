import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenados } from "./usuario.dm";
import { EmailUnicoValidator } from "./validacao/email-unico-validator";

@Module({
imports:[],
controllers:[UsuarioController],
providers:[UsuarioArmazenados,EmailUnicoValidator],

})
export class UsuarioModule{}