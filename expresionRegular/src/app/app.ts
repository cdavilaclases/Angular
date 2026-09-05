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
  protected readonly title = signal('expresionRegular');
  palabra:string="";

  analizar(){
    if(this.parsear()){

        alert("Cadena aceptada");
    }
    else{
      alert("Cadena invalida");
    }
    
  }

  parsear():boolean{
    let caracteres = this.palabra.split("");
    let estado = "A";
    let aceptar = false;
    for(let c of caracteres){
      let codigo = c.charCodeAt(0);
      switch(estado){
        case "A":
          if((codigo>=65 && codigo<=90)||(codigo>=97&&codigo<=122)){
              estado = "B";
              aceptar = true;
          }
          else{
            return false;
          }

        break;
        case "B":
          if((codigo>=65 && codigo<=90)
            ||(codigo>=97&&codigo<=122)
          ||(codigo==95)
          ||(codigo>=48 && (codigo)<=57)
          ){
            estado = "B";
            aceptar = true;
          }
          else{
            return false;
          }
      }
      
    }
    return aceptar;
  }
}
