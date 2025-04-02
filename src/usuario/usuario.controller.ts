import { Body, Controller, Delete, Get, HttpServer, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { lastValueFrom, map } from "rxjs";
import { response } from "express";
import { HttpService } from "@nestjs/axios";
import { error } from "console";


@ApiTags('usuario')
//decorator responsavel por definir que essa class

@Controller('/usuarios')
export class UsuarioController{

constructor(private clsUsuarioArmazenados: UsuarioArmazenados, private HttpService: HttpService){}

    @Post()
    @ApiResponse({status: 201, description:'Retorno que hoube sucesso'})
    @ApiBadRequestResponse({description: 'Retornar a informação que houve status 201'})
       async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){
    

    // var validacoes = this.clsUsuarioArmazenados.validaUsuario(dadosUsuario);
     //if (validacoes.length> 0){
       // return{
         //   status: "Erro",
           // validacoes: validacoes

        //}
     //}
     var mensagemErro ='';
     try{


     var retornoCep = await lastValueFrom(this.HttpService
        .get(`https://viacep.com.br/ws/${dadosUsuario.cep}/json/`)
        .pipe(
           map((response) => response.data )



          ))
          if(retornoCep.error == "true"){
            throw new Error("CEP Não encontro")
          }
        }catch(erro){
            mensagemErro ='Erro ao consultar CEP informado, favor informar CEP valido.';
            return{
              message: mensagemErro,
              status:"Erro cadastro do usuario"
            }

        }
        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade,
        dadosUsuario.cep, retornoCep.logradouro ? retornoCep.logradouro:'',
        dadosUsuario.complemento, retornoCep.localidade,
        dadosUsuario.email, dadosUsuario.telefone, dadosUsuario.senha);

     this.clsUsuarioArmazenados.AdicionarUsuario(novoUsuario);


        var usuario={
            dadosUsuario : novoUsuario,
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
                usuario.senha,

            )
        )

       return listaRetorno;

     
    } 
    
   @Put('/:id')
    async atualizaUsuario(@Param("id") id: string, @Body() novoDados: alteraUsuarioDTO){
        var messageError ='';
        if (novoDados.cep){
            try{
                var retornoCep = await lastValueFrom(this.HttpService
                    .get(`https://viacep.com.br/ws/${novoDados.cep}/json/`)
                    .pipe(
                        map((response) => response.data)
                    ))
                if(retornoCep.erro){
                    retornoCep = null
                    throw new Error ("CEP não encontrado")
                }
            }catch(error){
                messageError = 'Erro ao buscar CEP' + error.message;

            }
            var dadosEndeco ={
                endereco: retornoCep?retornoCep.logradouro:'',
                cidade: retornoCep?retornoCep.localidade:'',
                cep: novoDados.cep
            }
            await this.clsUsuarioArmazenados.atualizaUsuario(id,dadosEndeco)
        }
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

    @Post("/login")
    async login(@Body() dadoslogin: LoginUsuarioDTO){
        var login  = this.clsUsuarioArmazenados.validarLogin(dadoslogin.email, dadoslogin.senha);
 
        return{
            status: login.login,
            usuario: login.login?login.usuario: null,
            message: login?"login Efetuado" : "Usuario ou senha Invalidos"
        }
    }
}



