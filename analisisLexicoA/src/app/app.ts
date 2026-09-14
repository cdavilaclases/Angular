import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet,CommonModule,MatIconModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('analisisLexicoA');
  tokens:any = [];
  texto:string = "";

  analizar(){
    this.texto = this.texto + "\n";
    let caracteres = [...this.texto];
    let estado = 'A';
    let fila = 1;
    let columna = 0;
    let token:any = {};
    this.tokens = [];

    for(let c of caracteres){
      let codigo = c.charCodeAt(0);
      columna++;
      switch(estado){
        case 'A':
          switch(codigo){
            case 101:
              token = this.llenarToken("Identificador","e",fila,columna);
              estado = 'B';
            break;

            case 10:
              if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token);
              token = {};
              estado = 'A';
            break;
          }
          break;
        case 'B':
          switch(codigo){
            case 108:
              token = this.llenarToken("Identificador","el",fila,token.columna);
              estado = 'C';
            break;

            case 10:
              if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token);
              token = {};
              estado = 'A';
            break;

          }
          break;
        case 'C':
           switch(codigo){
            case 115:
              token = this.llenarToken("Identificador","els",fila,token.columna);
              estado = 'D';
            break;

            case 10:
              if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token);
              token = {};
              estado = 'A';
            break;

          }
          break;
        case 'D':
          switch(codigo){
            case 101:
              token = this.llenarToken("Else","else",fila,token.columna);
              estado = 'E';
            break;

            case 10:
              if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token);
              token = {};
              estado = 'A';
            break;

          }          
          break;
        case 'E':
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token);
              token = {};
              estado = 'A';
            break;
          }
          break;    

      }

    }

  }

  llenarToken(token:string,lexema:string, fila:number, columna:number){
    let objeto:any = {};
    objeto.token = token;
    objeto.lexema = lexema;
    objeto.fila = fila;
    objeto.columna = columna;

    return objeto;
  }

}
