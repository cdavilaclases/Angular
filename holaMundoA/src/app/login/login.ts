import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html'
})
export class Login {


  formulario: FormGroup;
  private readonly http:HttpClient;

  constructor(http:HttpClient, private fb: FormBuilder){
    this.http = http;
    this.buscarInfo();

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }


  enviar(){
     if (this.formulario.valid) {
      console.log(this.formulario.value);
      let t = {...this.formulario.value};
      t.fechaCreacion = new Date();
      this.http.post("http://localhost:8080/usuario/guardar",t).subscribe(
        info => this.mostrar(info)
      )
    } else {
      console.log('Formulario inválido');
    }
  }

  buscarInfo(){
    console.log("llama");
    this.http.get("http://localhost:8080/usuario/buscar").subscribe(
        info => this.mostrar(info)
      )
  }

  mostrar(info:any){
    console.log(info);
  }

  test(){
    location.href ="/bienvenida";
  }

}
