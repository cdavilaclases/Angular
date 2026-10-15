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
//Funciones de JS
}

/*
Los guiones bajos _ representan caracteres en blanco o comentarios
La expresion regular se encuentra programada al final 
de la gramatica ambos se deben de ignorar.
*/
S = _ Clase _

Clase = "public" _ "class" _ Identificador _ "{" DefinicionClase "}"


//Solo recursividad por la derecha  
DefinicionClase = _ DeclaracionVariable _ DefinicionClase
                / _ DeclaracionVariable _

DeclaracionVariable = Tipo _ Identificador _ ";"

Tipo = "int"
    / "char"
    / "double"
    / "boolean"
    / "float"
    / "long"
    / "short"
    / "byte"

//Expresiones regulares
Identificador = [a-zA-Z_] [a-zA-Z0-9_]*

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
