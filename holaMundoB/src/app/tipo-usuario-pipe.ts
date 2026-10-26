import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario',
})
export class TipoUsuarioPipe implements PipeTransform {
  transform(value: number, tipos: any[]): string {
    
    for(let tipo of tipos){
      if(tipo.idtipoUsuario==value){
        return tipo.descripcion;
      }
    }
    return 'No hay información';
  }
}
