import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenados } from "./usuario.dm";

@Module({
imports:[],
controllers:[UsuarioController],
providers:[UsuarioArmazenados],

})
export class UsuarioModule{}