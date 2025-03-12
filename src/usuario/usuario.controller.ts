import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/auteraUsuario.dto";
@Controller('/usuarios')

export class UsuarioController{
constructor(private clsUsuarioArmazenados: UsuarioArmazenados){}

    @Post()

    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){

    // var validacoes = this.clsUsuarioArmazenados.validaUsuario(dadosUsuario);
     //if (validacoes.length> 0){
       // return{
         //   status: "Erro",
           // validacoes: validacoes

        //}
     //}
     var novoUsuario = new UsuarioEntity (uuid(),dadosUsuario.nome, dadosUsuario.idade, dadosUsuario.cidade,
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
        
        const usuarioslistados = this.clsUsuarioArmazenados.Usuarios;
        const listaRetorno = usuarioslistados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.cidade,
                usuario.email,

            )
        )

       return listaRetorno;

     
    } 
    
   @Put('/:id')
    async atualizaUsuario(@Param("id") id: string, @Body() novoDados: alteraUsuarioDTO){
        const usuarioAtualizado = await this.clsUsuarioArmazenados.atualizaUsuario(id, novoDados)
     return{
        usuario: usuarioAtualizado,
        message: 'Usuario atualizado'
     }
}
     @Delete('/:id')
     async removeUsuario(@Param('id') id: string){
       const usuarioRemovido = await this.clsUsuarioArmazenados.removeUsuario(id)
    return{
        usuario: usuarioRemovido,
        message: 'Usuario removido'}
    }
}
