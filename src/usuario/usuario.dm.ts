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
   async validaEmail(email: string): Promise <boolean>{
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario!== undefined);


    }
   async removeUsuario(id:string){
    const usuario = this.buscaPorID(id);

    this.#usuarios = this.#usuarios.filter(
        usuarioSalvo => usuarioSalvo.id !== id
    )

     return usuario;
   }

   atualizaUsuario(id: string,dadosAtualizacao: Partial<UsuarioEntity>){
    const usuario = this.buscaPorID(id);

    Object.entries(dadosAtualizacao).forEach(
        ([chave,valor]) =>{
            if (chave === 'id'){
                return
            }
            usuario [chave] = valor;
        }

    )
    return usuario
   } 

   private buscaPorID(id: string){
    const possivelUsuario = this.#usuarios.find(
        usuarioSalvo => usuarioSalvo.id === id
    )
    if (!possivelUsuario){
        throw new Error('Usuario nao encontrado')
    }
    return possivelUsuario
   }


//     validaUsuario(dadosUsuario){
//         var validacoes: string[] = [];

//         if(!(dadosUsuario.id != null)){

//           validacoes.push("Id não poder ser nulo");
//         } 
//         if(!(dadosUsuario.nome != null)){
//           validacoes.push("Nome não poder ser nulo");
//         }
//         if(!(dadosUsuario.idade != null)){
//           validacoes.push("idade não poder ser nulo");
//         }
//         if(!(dadosUsuario.cidade != null)){
//           validacoes.push("cidade não poder ser nulo");
//         }
//         if(!(dadosUsuario.email != null)){
//           validacoes.push("email não poder ser nulo");
//         }
//         if(!(dadosUsuario.telefone != null)){
//           validacoes.push("telefone não poder ser nulo");
//         }
//         if(!(dadosUsuario.senha != null)){
//           validacoes.push("senha não poder ser nulo");
//         }
//         return validacoes;

// }

}
