import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet,FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('expresionRegularA');
  texto:string = "";

  validar(){

    if(this.parsear()){
      alert("Cadena acepta.")
    }
    else{
      alert("Cadena invalida.")
    }

  }

  parsear():boolean{

    let acetpar = false;
    let estado = "A";

    let caracteres = this.texto.split("");

    for(let c of caracteres){

      let simbolo = c.charCodeAt(0);

      switch(estado){
        
        case "A":

          if((simbolo>=65 && simbolo <=90) 
            || (simbolo>=97 && simbolo<=122)){
              estado = "B";
              acetpar = true;
            }
          else {

            return false;

          }

        break;

        case "B":

        if((simbolo>=65 && simbolo <=90) 
            || (simbolo>=97 && simbolo<=122)
            || (simbolo>=48 && simbolo <= 57)
            || (simbolo == 95)){
              estado = "B";
              acetpar = true;
            }
          else {

            return false;

          }

        break;

      }


    }

    return acetpar;
  }

}
