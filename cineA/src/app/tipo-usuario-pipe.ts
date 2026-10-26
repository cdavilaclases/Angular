import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario',
})
export class TipoUsuarioPipe implements PipeTransform {
  transform(value: number, tipos: any[]): string {
    for(let tipo of tipos){
      if(value == tipo.idtipoUsuario){
        return tipo.descripcion;
      }
    }
    return "No tiene valor";
  }
}
