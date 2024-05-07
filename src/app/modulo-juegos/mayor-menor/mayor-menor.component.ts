import { Component } from '@angular/core';
import { BtnVolverComponent } from "../btn-volver/btn-volver.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mayor-menor',
    standalone: true,
    templateUrl: './mayor-menor.component.html',
    styleUrl: './mayor-menor.component.css',
    imports: [BtnVolverComponent, CommonModule]
})
export class MayorMenorComponent {


  
  cartaPrincipal;
  cartaSecundaria;
  mensaje!:string;
  Mensaje!:string;
  cuenta: number = 0;
  vidas: number = 5;
  mostrarFin: boolean= false;
  numero!: number;

  cartas = [{ numero: 1, pathImg: './../../assets/imagenes/baraja/1.jpg' },
  { numero: 2, pathImg: './../../assets/imagenes/baraja/2.jpg' },
  { numero: 3, pathImg: './../../assets/imagenes/baraja/3.jpg' },
  { numero: 4, pathImg: './../../assets/imagenes/baraja/4.jpg' },
  { numero: 5, pathImg: './../../assets/imagenes/baraja/5.jpg' },
  { numero: 6, pathImg: './../../assets/imagenes/baraja/6.jpg' },
  { numero: 7, pathImg: './../../assets/imagenes/baraja/7.jpg' },
  { numero: 8, pathImg: './../../assets/imagenes/baraja/8.jpg' },
  { numero: 9, pathImg: './../../assets/imagenes/baraja/9.jpg' },
  { numero:10, pathImg: './../../assets/imagenes/baraja/10.jpg' },
  { numero:11, pathImg: './../../assets/imagenes/baraja/11.jpg' },
  { numero:12, pathImg: './../../assets/imagenes/baraja/12.jpg' },
  { numero: 13, pathImg: './../../assets/imagenes/baraja/1e.JPG' },
  { numero: 14, pathImg: './../../assets/imagenes/baraja/2e.JPG' },
  { numero: 15, pathImg: './../../assets/imagenes/baraja/3e.JPG' },
  { numero: 16, pathImg: './../../assets/imagenes/baraja/4e.JPG' },
  { numero: 17, pathImg: './../../assets/imagenes/baraja/5e.JPG' },
  { numero: 18, pathImg: './../../assets/imagenes/baraja/6e.JPG' },
  { numero: 19, pathImg: './../../assets/imagenes/baraja/7e.JPG' },
  { numero: 20, pathImg: './../../assets/imagenes/baraja/8e.JPG' },
  { numero: 21, pathImg: './../../assets/imagenes/baraja/9e.JPG' },
  { numero:22, pathImg: './../../assets/imagenes/baraja/10e.JPG' },
  { numero:23, pathImg: './../../assets/imagenes/baraja/11e.JPG' },
  { numero:24, pathImg: './../../assets/imagenes/baraja/12e.JPG' },
  { numero: 25, pathImg: './../../assets/imagenes/baraja/1c.JPG' },
  { numero: 26, pathImg: './../../assets/imagenes/baraja/2c.JPG' },
  { numero: 27, pathImg: './../../assets/imagenes/baraja/3c.JPG' },
  { numero: 28, pathImg: './../../assets/imagenes/baraja/4c.JPG' },
  { numero: 29, pathImg: './../../assets/imagenes/baraja/5c.JPG' },
  { numero: 30, pathImg: './../../assets/imagenes/baraja/6c.JPG' },
  { numero: 31, pathImg: './../../assets/imagenes/baraja/7c.JPG' },
  { numero: 32, pathImg: './../../assets/imagenes/baraja/8c.JPG' },
  { numero: 33, pathImg: './../../assets/imagenes/baraja/9c.JPG' },
  { numero:34, pathImg: './../../assets/imagenes/baraja/10c.JPG' },
  { numero:35, pathImg: './../../assets/imagenes/baraja/11c.JPG' },
  { numero:36, pathImg: './../../assets/imagenes/baraja/12c.JPG' },
  { numero: 37, pathImg: './../../assets/imagenes/baraja/1b.JPG' },
  { numero: 38, pathImg: './../../assets/imagenes/baraja/2b.JPG' },
  { numero: 39, pathImg: './../../assets/imagenes/baraja/3b.JPG' },
  { numero: 40, pathImg: './../../assets/imagenes/baraja/4b.JPG' },
  { numero: 41, pathImg: './../../assets/imagenes/baraja/5b.JPG' },
  { numero: 42, pathImg: './../../assets/imagenes/baraja/6b.JPG' },
  { numero: 43, pathImg: './../../assets/imagenes/baraja/7b.JPG' },
  { numero: 44, pathImg: './../../assets/imagenes/baraja/8b.JPG' },
  { numero: 45, pathImg: './../../assets/imagenes/baraja/9b.JPG' },
  { numero:46, pathImg: './../../assets/imagenes/baraja/10b.JPG' },
  { numero:47, pathImg: './../../assets/imagenes/baraja/11b.JPG' },
  { numero:48, pathImg: './../../assets/imagenes/baraja/12b.JPG' },

];


  constructor() {
    
    this.cartaPrincipal = this.calcularCartaRandom();
    this.cartaSecundaria = this.calcularCartaRandom();
  }

  ngOnInit(): void {
    console.log(this.cartas);
  }


  calcularCartaRandom() {
    return this.cartas[Math.floor(Math.random() * this.cartas.length)];
  }

  play(res:string){
    if(this.respuesta(res)){
      this.cuenta++;
      this.cartaPrincipal = this.cartaSecundaria;
      this.cartaSecundaria= this.calcularCartaRandom();
      this.mensaje ='BIEN!'
      this.MostarMensaje("Bien, Adivinaste", true)
    }else{
      if(this.vidas > 0){ 
      this.vidas--;
      this.mensaje ='NO :(';
      this.MostarMensaje("No acertaste", false)
      
      this.cartaPrincipal = this.cartaSecundaria;
      this.cartaSecundaria= this.calcularCartaRandom();
      if(this.vidas == 0){
        this.mostrarFin= true; 
      }
    }
    }
  }


  respuesta(res: string):boolean{ 
    switch (res) {
      case 'mayor':
        if (this.cartaPrincipal.numero < this.cartaSecundaria.numero) {
          return true;
        } else {
          return false;
        }
        break;

      case 'igual':
        if (this.cartaPrincipal.numero == this.cartaSecundaria.numero) {
          return true;
        } else {
          return false;
        }
        break;
      case 'menor':
        if (this.cartaPrincipal.numero > this.cartaSecundaria.numero) {
          return true;
        } else {
          return false;
        }
        break;
      default:
        return false;
        break;
    }
  }

  reload() {
    this.cartaPrincipal = this.cartaSecundaria;
      this.cartaSecundaria= this.calcularCartaRandom();
  this.cuenta = 0;
  this.vidas = 5;
  this.mostrarFin= false;
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
