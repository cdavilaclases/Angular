import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule,FormsModule,MatBadgeModule,MatTableModule,MatInputModule,MatFormFieldModule],
  selector: 'app-analizador',
  styleUrl: './analizador.css',
  templateUrl: './analizador.html',
})
export class Analizador {

  codigo:string = "";

  dataSource:any = [];

  displayedColumns = ['token','lexema', 'fila', 'columna']

  tokenizar(){

    let fila = 1;
    let columna = 0;
    let estado = 'A';
    let token:any = {};
    this.codigo = this.codigo+"\n";
    let simbolos = [...this.codigo];
    this.dataSource = [];

    for(let s of simbolos){
      console.log(s);
      let lexema = "";
      columna++;

      let codigo = s.charCodeAt(0);

      switch(estado){

        case 'A':
          switch (codigo){
            case 83:
              token = this.crearToken('Identificador','S',fila,columna);
              lexema = 'S';
              estado = 'B';
              console.log("ir estado B");
              break;
            case 10: //salto de linea
              if (token.token) this.dataSource.push(token);
              token = {};
              fila++;
              columna = 0;
              break;
            case 32: //espacio
              if (token.token) this.dataSource.push(token);
              token = {};
              break;

          }
          break;
        case 'B':
          switch (codigo){
            case 116:
              token = this.crearToken('Identificador','St',fila,columna);
              lexema = 'St';
              estado = 'C';
              console.log("ir estado C");
              break;
            case 10: //salto de linea
              if (token.token) this.dataSource.push(token);
              token = {};
              fila++;
              columna = 0;
              break;
            case 32: //espacio
              if (token.token) this.dataSource.push(token);
              token = {};
              break;

          }
          

        break;
        case 'C':
          switch (codigo){
            case 114:
              token = this.crearToken('String','Str',fila,columna);
              lexema = 'Str';
              estado = 'C';
              break;
            case 10: //salto de linea
            console.log("agrega"); 
            console.log(token);
            console.log(this.dataSource);
            if (token.token) this.dataSource.push(token);
              token = {};
              fila++;
              columna = 0;
              estado = 'A';
              break;
            case 32: //espacio
              if (token.token) this.dataSource.push(token);
              token = {};
              estado = 'A';
              break;

          }
          break;
      }


    }
    this.dataSource = this.dataSource; 

  }

  crearToken(token:string, lexema:string, fila:number, columna:number){

    let objeto:any = {};
    objeto.token = token;
    objeto.lexema = lexema;
    objeto.fila = fila;
    objeto.columna = columna;

    return objeto;


  }

}
