import * as bcrypt from 'bcrypt';



export class UsuarioEntity{
    id: string;
    nome: string;
    idade: Number;
    endereco: string;
    cep: string;
    complemento:string;
    cidade: string;
    email: string;
    telefone: string;
    senha: string;
    constructor(id:string, nome:string, idade:Number, endereco:string, cep:string, complemento:string, cidade:string,  email:string, telefone:string, senha:string){
        const saltOrRounds = 10;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.idade = idade;
        this.cidade = cidade;
        this.endereco = endereco;
        this.cep = cep;
        this.complemento = complemento;
        
        this.senha = bcrypt.hashSync(senha,saltOrRounds);
    }
    
    trocarSenha(senhaNova){
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senhaNova,saltOrRounds);
    }

    login(senha){
        return bcrypt.compareSync(senha,this.senha);
    }

    
}