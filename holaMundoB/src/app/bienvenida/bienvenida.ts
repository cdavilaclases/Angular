import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TipoUsuarioPipe } from '../tipo-usuario-pipe';

@Component({
  imports: [ ReactiveFormsModule,FormsModule,CommonModule,TipoUsuarioPipe],
  selector: 'app-bienvenida',
  styleUrl: './bienvenida.css',
  templateUrl: './bienvenida.html',
})
export class Bienvenida implements OnInit{


  formulario:FormGroup;
  private readonly http:HttpClient;

  usuarios:any = [];

  tipos:any = [];

  

  

  constructor(private fb:FormBuilder, http:HttpClient, 
    private cdr : ChangeDetectorRef ){
    this.formulario = this.fb.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        nombre:['',Validators.required],
        tipo:['',Validators.required]
      }

    );
    this.http = http;
    
    
    
  }

  ngOnInit(): void {
    this.buscarUsuarios();
    this.buscarTipos();
  }

  buscarUsuarios(){
    this.http.get("http://localhost:8080/usuario/buscar").subscribe(
      data => {
        this.usuarios = data;
        this.cdr.detectChanges();
      }
    )
  }

  buscarTipos(){
    this.http.get("http://localhost:8080/tipo/buscar").subscribe(
      data => {
        this.tipos = data;
        this.cdr.detectChanges();
      }
    )
  }

  

  guardarUsuario(){
    if(this.formulario.valid){
      let temp = {...this.formulario.value};
      temp.fechaCreacion = new Date();
      this.http.post("http://localhost:8080/usuario/guardar",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  mostrar(data:any){
    if(data?.idusuario){
      alert("Usuario creado con el id: "+data.idusuario);
      this.buscarUsuarios();
    }
    else{
      alert("Error al crear usuario, existe un problema en el servidor.")
    }
  }
  verTelefonos(usuario:any){
    location.href="/telefonos/"+usuario.idusuario;
  }
}
