import { Service } from '@angular/core';
import * as peggy from 'peggy';

@Service()
export class Parser2 {

  private parser!: peggy.Parser;

  constructor() {
    this.compileGrammar();
  }


  
  compileGrammar() {

    
    const grammar = `

    {
      let estructuras = [];



    }

    INICIO = SENTENCIAS {
      console.log(estructuras);
    }

    SENTENCIAS = _ SENTENCIA _ SENTENCIAS
              /_ SENTENCIA _

    SENTENCIA = "STACK" _ nom:Identificador _ ";" {
                let nuevo = {};
                nuevo.nombre = nom;
                nuevo.tipo = "PILA";
                nuevo.valores = [];
                estructuras.push(nuevo);
            }
              /"QUEUE" _ Identificador _ ";"
              /"PUSH" _ "(" _ nom:Identificador _ "," _ n:VALOR _ ")" _ ";"{
                  for(let l of estructuras){
                    if(l.nombre == nom){
                      l.valores.push(n);
                    }
                  }
              }

              /"POP" _ "(" _ Identificador _ ")" _ ";"
                     
    
     VALOR = n:numero{ return n; } 
             /texto         
//Expresiones regulares
Identificador = primero:[a-zA-Z_] segundo:[a-zA-Z0-9_]* {
    return primero + segundo.join("");
}
numero = n:[0-9]+ { return n; }
texto = "\\"" [^\\"]* "\\""
// Ignora espacios y comentarios
_ = (Blancos / Comentario)*

Blancos = [ \\t\\n\\r]+

Comentario = "//" [^\\n]* ("\\n" / !.)
`;
    this.parser = peggy.generate(grammar);

  }

  parse(texto: string): any {
    return this.parser.parse(texto);
  }

}
