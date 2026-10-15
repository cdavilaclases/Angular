import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import  {Parser2} from './parser/parser2';

@Component({
  imports: [FormsModule],
  selector: 'app-ejemplo2',
  styleUrl: './ejemplo2.css',
  templateUrl: './ejemplo2.html',
})
export class Ejemplo2 {

  texto:string = `
    //Ejemplo de una declaracion de clases similar a Java

    public class Test { //Se Puede cambar el nombre de la clase

    //Declaracion de variables, se pueden agregar mas variables
    int num1;
    char _LETRA;
    double num;
    
    //si descomenta esta linea da error, o si no se respeta la gramatica

    }
    `;
    private parser:Parser2;

  constructor(parser:Parser2){
      this.parser = parser;
    }

    parsear(){
        try{
          this.parser.parse(this.texto);
          alert("Cadena valida");
        }catch(e:any){
          console.log(e);
          alert("Cadena invalida");
        }
    
      }

      ejemplo1(){
        location.href = "";
      }
}
