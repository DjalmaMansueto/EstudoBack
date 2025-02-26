import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
@Controller('/usuarios')

export class UsuarioController{
constructor(private clsUsuarioArmazenados: UsuarioArmazenados){}

    @Post()

    async criaUsuario(@Body() dadosUsuario){

     var validacoes = this.clsUsuarioArmazenados.validaUsuario(dadosUsuario);
     if (validacoes.length> 0){
        return{
            status: "Erro",
            validacoes: validacoes

        }
     }
     var novoUsuario = new UsuarioEntity(dadosUsuario.id, dadosUsuario.nome, dadosUsuario.idade, dadosUsuario.cidade,
        dadosUsuario.email, dadosUsuario.telefone, dadosUsuario.senha);

       this.clsUsuarioArmazenados.AdicionarUsuario(novoUsuario);


        var usuario={
            dadosUsuario : dadosUsuario,
            status: "Usuario criado"
        }
        return usuario

    }
    
    @Get()
    async ListaUsuario(){
        return this.clsUsuarioArmazenados.Usuarios;
    } 
}
