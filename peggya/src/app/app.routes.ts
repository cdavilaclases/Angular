import { Routes } from '@angular/router';
import { Ejemplo1 } from './ejemplo1/ejemplo1';
import { Ejemplo2 } from './ejemplo2/ejemplo2';

export const routes: Routes = [

    {path:"",component:Ejemplo1},
    {path:"ejemplo2",component:Ejemplo2}

];
