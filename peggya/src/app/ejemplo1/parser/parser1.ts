import { Service } from '@angular/core';
import * as peggy from 'peggy';

@Service()
export class Parser1 {

    private compilador!:peggy.Parser;

    constructor(){
        this.compileGrammar();
    }
    private compileGrammar(){

        const grammar = `
            {
                let count = 0;
                function cuentaNodo(){
                    return count++;
                }
                function potenciaDos(pot){
                    let resultado = 1;
                    for(let i = 1; i<= pot; i++){
                        resultado = 2*resultado;
                    }
                    return resultado;
                }   
            }
            I = s:S{
                let nodo = {...s};
                return nodo;
            }
            S = b:B s:S{
                let nodo = {};
                nodo.val = potenciaDos(s.pot + 1)*b.val + s.val;
                nodo.pot = s.pot + 1;
                nodo.numero = "nodo"+cuentaNodo();
                nodo.codigo = b.codigo + s.codigo 
                + nodo.numero + " [label = S];"
                + nodo.numero + "->" + b.numero + ";"
                + nodo.numero + "->" + s.numero + ";";

                return nodo;
            }
                /b:B{
                    let nodo = {...b};
                    nodo.numero = "nodo"+cuentaNodo();
                    nodo.codigo = b.codigo + nodo.numero + " [label = S];"
                    + nodo.numero +"->" + b.numero + ";";
                    return nodo;
                }
            B = "0"{
                    let nodo = {};
                    nodo.val = 0;
                    nodo.pot = 0;
                    nodo.numero = "nodo"+cuentaNodo();
                    let t = "nodo"+cuentaNodo();
                    nodo.codigo = nodo.numero 
                    + " [label = B];"+t+" [label = 0];" + nodo.numero 
                    + "->" + t+";" ;
                    return nodo;
                }
                /"1"{
                    let nodo = {};
                    nodo.val = 1;
                    nodo.pot = 0;
                    nodo.numero = "nodo"+cuentaNodo();
                    let t = "nodo"+cuentaNodo();
                    nodo.codigo = nodo.numero 
                    + " [label = B];"+t+" [label = 1];" + nodo.numero 
                    + "->" + t+";" ;
                    return nodo;
                }
        `;
        this.compilador = peggy.generate(grammar);
    }

    validar(texto:string):any{
        return this.compilador.parse(texto);
    }


}
