import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioArmazenados{
    #usuarios: UsuarioEntity[]=[];
    
    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);

    }
    get Usuarios(){
        return this.#usuarios;



    }
    validaUsuario(dadosUsuario){
        var validacoes: string[] = [];

        if(!(dadosUsuario.id != null)){

          validacoes.push("Id não poder ser nulo");
        } 
        if(!(dadosUsuario.nome != null)){
          validacoes.push("Nome não poder ser nulo");
        }
        if(!(dadosUsuario.idade != null)){
          validacoes.push("idade não poder ser nulo");
        }
        if(!(dadosUsuario.cidade != null)){
          validacoes.push("cidade não poder ser nulo");
        }
        if(!(dadosUsuario.email != null)){
          validacoes.push("email não poder ser nulo");
        }
        if(!(dadosUsuario.telefone != null)){
          validacoes.push("telefone não poder ser nulo");
        }
        if(!(dadosUsuario.senha != null)){
          validacoes.push("senha não poder ser nulo");
        }
        return validacoes;

}

}
