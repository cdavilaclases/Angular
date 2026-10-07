import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Telefonos } from './telefonos/telefonos';

export const routes: Routes = [
    {path:'',component:Login},
    {path:'bienvenida',component:Bienvenida},
    {path:'telefonos/:idusuario',component:Telefonos},
];
