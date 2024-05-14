import { Component } from '@angular/core';
import { HpImageService } from '../../servicios/hp-image.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BtnVolverComponent } from "../btn-volver/btn-volver.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-preguntados',
    standalone: true,
    templateUrl: './preguntados.component.html',
    styleUrl: './preguntados.component.css',
    imports: [FormsModule, BtnVolverComponent, CommonModule, ]
})
export class PreguntadosComponent {

  personaje: any=[];
  arrayPersonajes: any =[];
  nombres: any =[];
  opciones: any = [];
  cargo:boolean = false;
  eleccion!:string;
  cuenta= 0;
  Mensaje!:string;
  vidas = 5;
  termino=false;
  showSpinner=false;  
  constructor(private hpService: HpImageService){

  }

  async traerPersonajes()
  {
    for(let i= 0; i<10; i++){
      this.hpService.getPersonajes().subscribe((personaje:any) =>{
        this.arrayPersonajes.push(personaje[i]);
        
      });
    }
    
    

  }
  
  cargarSpinner()
  {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 4000); // 4 segundos = 4000 milisegundos
  }

  ngOnInit() { 
    this.cargarSpinner();
    this.traerPersonajes();
     }

   cargarPersonaje()
   {
    
    this.termino=false;
    this.cuenta=0;
    this.vidas=5;
    this.eleccion="";
    this.opciones = [];
    this.reiniciarNombres();
    let num= Math.floor(Math.random() * 10)
    this.personaje = this.arrayPersonajes[num];
    this.generarOpciones();
    this.cargo = true;
    
   }
   

   cargarPersonaje2()
   {
    this.eleccion="";
    this.opciones = [];
    this.reiniciarNombres();
    let num= Math.floor(Math.random() * this.arrayPersonajes.length)
    console.log("hay "+this.arrayPersonajes.length)
    this.personaje = this.arrayPersonajes[num];
    this.generarOpciones();
    this.cargo = true;
    
   }

   
   generarOpciones()
   {
      
      this.nombres.sort(function(){return Math.random() - 0.5 });
      for (let i=0; i<3;i++)
      {
        if(this.nombres[i]!= this.personaje.name)
          {
            this.opciones.push(this.nombres[i]);
          }
        else
          this.opciones.push(this.nombres[i+2]);
          console.log("El nombre es"+i + this.nombres[i]);
      }
      
      this.opciones.push(this.personaje.name);
      console.log("El nombre es correcto es "+this.personaje.name);

      this.opciones.sort(function(){return Math.random() - 0.5 });
   }

   reiniciarNombres()
   {
    this.nombres = ["Harry Potter", 
    "Hermione Granger","Ron Weasley","Draco Malfoy","Minerva McGonagall","Cedric Diggory","Cho Chang", "Severus Snape", "Rubeus Hagrid", "Neville Longbottom"];
    
   }
   

   verificar()
   {
    if(this.vidas>0)
    {
    if(this.personaje.name == this.eleccion)
    {
      this.cuenta= this.cuenta+1;
      this.MostarMensaje("Muy bien, adivinaste el personaje", true);
    }
    else
    {
      this.MostarMensaje("Ups, no adivinaste el personaje", false);
    }
    this.cargarPersonaje2();
    this.vidas=this.vidas-1;
    console.log(this.vidas);
    console.log(this.arrayPersonajes);
    
    }
    if(this.vidas==0)
      {
      this.termino=true;
      this.arrayPersonajes.
      this.traerPersonajes();}
   }

   reiniciar()
   {
    window.location.reload();
   }

   
  MostarMensaje(mensaje:string,gano:boolean) {
    this.Mensaje = mensaje;
   var x = document.getElementById("snackbar");
   if(gano)
       x!.className = "show Ganador";
    else
      x!.className = "show Perdedor"
   var modelo = this;
   setTimeout(function(){ 
     x!.className = x!.className.replace("show", "");
     //modelo.ocultarVerificar=false;
    }, 3000);


  }

}
