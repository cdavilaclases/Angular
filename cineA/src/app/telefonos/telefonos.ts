import { Component,ChangeDetectorRef,inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
;
import { ActivatedRoute } from '@angular/router';
@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-telefonos',
  styleUrl: './telefonos.css',
  templateUrl: './telefonos.html',
})
export class Telefonos {

  private readonly htpp:HttpClient;

  private route = inject(ActivatedRoute);

  telefonos:any = [];

  constructor(http:HttpClient,
    private fb: FormBuilder,
  private cdr:ChangeDetectorRef){

    this.htpp= http;
    this.buscarTelefonos(this.route.snapshot.paramMap.get("idusuario"));
  }

  buscarTelefonos(idUsuario:any){
    this.htpp.get("http://localhost:8080/telefono/buscar/"+idUsuario
      ).subscribe(
      data => {
          this.telefonos=data;
          this.cdr.detectChanges();
      }
    )
  }

}
