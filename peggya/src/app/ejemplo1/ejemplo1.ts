import { Component,ElementRef,ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Parser1 } from './parser/parser1';

import * as d3 from 'd3';
import 'd3-graphviz';

@Component({
  imports: [FormsModule],
  selector: 'app-ejemplo1',
  styleUrl: './ejemplo1.css',
  templateUrl: './ejemplo1.html',
})
export class Ejemplo1 {

  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;

  texto:string ="";
  private parser:Parser1;
  constructor(parser:Parser1){
    this.parser = parser;
  }

  parsear(){
    try{
      let nodo = this.parser.validar(this.texto);
      let codigo = "digraph {"+nodo.codigo+"}";
      let grafo:any = d3.select(this.graphContainer.nativeElement);
      grafo.graphviz().renderDot(codigo);

      alert("Es un  binario y su valor decimal es: "+nodo.val);
    }catch(e:any){
      console.log(e);
      alert("No es binario")
    }
  }

  ejemplo2(){
    location.href = "/ejemplo2";
  }
}
