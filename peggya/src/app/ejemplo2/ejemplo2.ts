import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parser2 } from './parser/parser2';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-ejemplo2',
  styleUrl: './ejemplo2.css',
  templateUrl: './ejemplo2.html',
})
export class Ejemplo2 {

  private router = inject(Router);
  jsonGenerado: string = "";

  texto: string = `
   STACK miPila;
   PUSH(miPila,1);
   PUSH(miPila,2);
   PUSH(miPila,3);
   STACK miPila2;
   PUSH(miPila2,2);
   PUSH(miPila2,4);
   PUSH(miPila2,6);
   PUSH(miPila2,8);
   GRAPH(miPila);
   GRAPH(miPila2);
    `;
  private parser: Parser2;

  constructor(parser: Parser2) {
    this.parser = parser;
  }

  parsear() {
    try {
      let arregloEstructuras = this.parser.parse(this.texto);
      this.jsonGenerado = JSON.stringify(arregloEstructuras);
      this.graficarEstructuras(arregloEstructuras);

    } catch (e: any) {
      console.log(e);
      alert("Cadena invalida");
    }

  }

  ejemplo1() {
    location.href = "";
  }

  graficarEstructuras(estructuras: any) {
    let retraso = 0;
    for (let estructura of estructuras) {
      if (estructura.graficar) {
        let codigoGraphviz = "";
        if (estructura.tipo == "PILA") {
          for (let i = 0; i < estructura.valores.length; i++) {
            codigoGraphviz += estructura.valores[i];
            if (i != estructura.valores.length - 1) {
              codigoGraphviz += "->";
            }
          }
        }
        const urlTree = this.router.createUrlTree(['/grafo'], {
          queryParams: { codigoGraphviz: codigoGraphviz, nombre: estructura.nombre }
        });

        const urlCompleta = this.router.serializeUrl(urlTree);
        window.open(urlCompleta, '_blank');
      }
    }
  }
}
