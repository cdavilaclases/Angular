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
    
    return estructuras;
}

SENTENCIAS = _ SENTENCIA _ SENTENCIAS
          /_ SENTENCIA _


SENTENCIA = "STACK" _ nom:Identificador _ ";" {
      let estructura = {};
      estructura.nombre = nom;
      estructura.tipo = "PILA";
      estructura.valores = [];
      estructura.graficar = false;
      estructuras.push(estructura);
}
            / "PUSH" _ "(" _ nom:Identificador _ "," _ val:VALOR _ ")" _ ";"{
              for(let estructura of estructuras){
                if(estructura.nombre == nom){
                  estructura.valores.push(val);
                }
              }
            }
            / "POP" _ "(" _ nom:Identificador ")" _ ";"{
              for(let estructura of estructuras){
                if(estructura.nombre == nom){
                  estructura.valores.pop();
                }
              }
            }
            / "GRAPH" _ "(" _ nom:Identificador ")" _ ";"{
              for(let estructura of estructuras){
                if(estructura.nombre == nom){
                  estructura.graficar = true;
                }
              }
            }  

VALOR = num:numero{
    return num;
}
      / cad:cadena {
        return cad;
      }

//Expresiones regulares
Identificador = a:[a-zA-Z_] b:[a-zA-Z0-9_]* {
    return a + b.join("");
}

numero = c:[0-9]+ {
    return c.join("");
} 

cadena = "\\"" c:[^\\"]* "\\"" {
    return c.join("");
}

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
