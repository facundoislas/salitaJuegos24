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
  mensaje!: string;
  Mensaje!: string;
  cuenta: number = 0;
  vidas: number = 5;
  mostrarFin: boolean = false;
  numero!: number;
  teclasBloqueadas: boolean = false;

  cartas = [
    { numero: 1, valor: 1, pathImg: './../../assets/imagenes/baraja/1.jpg' },
    { numero: 2, valor: 2, pathImg: './../../assets/imagenes/baraja/2.jpg' },
    { numero: 3, valor: 3, pathImg: './../../assets/imagenes/baraja/3.jpg' },
    { numero: 4, valor: 4, pathImg: './../../assets/imagenes/baraja/4.jpg' },
    { numero: 5, valor: 5, pathImg: './../../assets/imagenes/baraja/5.jpg' },
    { numero: 6, valor: 6, pathImg: './../../assets/imagenes/baraja/6.jpg' },
    { numero: 7, valor: 7, pathImg: './../../assets/imagenes/baraja/7.jpg' },
    { numero: 8, valor: 8, pathImg: './../../assets/imagenes/baraja/8.jpg' },
    { numero: 9, valor: 9, pathImg: './../../assets/imagenes/baraja/9.jpg' },
    { numero: 10, valor: 10, pathImg: './../../assets/imagenes/baraja/10.jpg' },
    { numero: 11, valor: 11, pathImg: './../../assets/imagenes/baraja/11.jpg' },
    { numero: 12, valor: 12, pathImg: './../../assets/imagenes/baraja/12.jpg' },
    { numero: 13, valor: 1, pathImg: './../../assets/imagenes/baraja/1e.JPG' },
    { numero: 14, valor: 2, pathImg: './../../assets/imagenes/baraja/2e.JPG' },
    { numero: 15, valor: 3, pathImg: './../../assets/imagenes/baraja/3e.JPG' },
    { numero: 16, valor: 4, pathImg: './../../assets/imagenes/baraja/4e.JPG' },
    { numero: 17, valor: 5, pathImg: './../../assets/imagenes/baraja/5e.JPG' },
    { numero: 18, valor: 6, pathImg: './../../assets/imagenes/baraja/6e.JPG' },
    { numero: 19, valor: 7, pathImg: './../../assets/imagenes/baraja/7e.JPG' },
    { numero: 20, valor: 8, pathImg: './../../assets/imagenes/baraja/8e.JPG' },
    { numero: 21, valor: 9, pathImg: './../../assets/imagenes/baraja/9e.JPG' },
    { numero: 22, valor: 10, pathImg: './../../assets/imagenes/baraja/10e.JPG' },
    { numero: 23, valor: 11, pathImg: './../../assets/imagenes/baraja/11e.JPG' },
    { numero: 24, valor: 12, pathImg: './../../assets/imagenes/baraja/12e.JPG' },
    { numero: 25, valor: 1, pathImg: './../../assets/imagenes/baraja/1c.JPG' },
    { numero: 26, valor: 2, pathImg: './../../assets/imagenes/baraja/2c.JPG' },
    { numero: 27, valor: 3, pathImg: './../../assets/imagenes/baraja/3c.JPG' },
    { numero: 28, valor: 4, pathImg: './../../assets/imagenes/baraja/4c.JPG' },
    { numero: 29, valor: 5, pathImg: './../../assets/imagenes/baraja/5c.JPG' },
    { numero: 30, valor: 6, pathImg: './../../assets/imagenes/baraja/6c.JPG' },
    { numero: 31, valor: 7, pathImg: './../../assets/imagenes/baraja/7c.JPG' },
    { numero: 32, valor: 8, pathImg: './../../assets/imagenes/baraja/8c.JPG' },
    { numero: 33, valor: 9, pathImg: './../../assets/imagenes/baraja/9c.JPG' },
    { numero: 34, valor: 10, pathImg: './../../assets/imagenes/baraja/10c.JPG' },
    { numero: 35, valor: 11, pathImg: './../../assets/imagenes/baraja/11c.JPG' },
    { numero: 36, valor: 12, pathImg: './../../assets/imagenes/baraja/12c.JPG' },
    { numero: 37, valor: 1, pathImg: './../../assets/imagenes/baraja/1b.JPG' },
    { numero: 38, valor: 2, pathImg: './../../assets/imagenes/baraja/2b.JPG' },
    { numero: 39, valor: 3, pathImg: './../../assets/imagenes/baraja/3b.JPG' },
    { numero: 40, valor: 4, pathImg: './../../assets/imagenes/baraja/4b.JPG' },
    { numero: 41, valor: 5, pathImg: './../../assets/imagenes/baraja/5b.JPG' },
    { numero: 42, valor: 6, pathImg: './../../assets/imagenes/baraja/6b.JPG' },
    { numero: 43, valor: 7, pathImg: './../../assets/imagenes/baraja/7b.JPG' },
    { numero: 44, valor: 8, pathImg: './../../assets/imagenes/baraja/8b.JPG' },
    { numero: 45, valor: 9, pathImg: './../../assets/imagenes/baraja/9b.JPG' },
    { numero: 46, valor: 10, pathImg: './../../assets/imagenes/baraja/10b.JPG' },
    { numero: 47, valor: 11, pathImg: './../../assets/imagenes/baraja/11b.JPG' },
    { numero: 48, valor: 12, pathImg: './../../assets/imagenes/baraja/12b.JPG' },
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

  play(res: string) {
    if (this.vidas === 0) {
      return;
    }
    if (this.respuesta(res)) {
      this.cuenta++;
      this.cartaPrincipal = this.cartaSecundaria;
      this.cartaSecundaria = this.calcularCartaRandom();
      this.mensaje = 'BIEN!';
      this.MostarMensaje("Bien, Adivinaste", true);
    } else {
      if (this.vidas > 0) {
        this.vidas--;
        this.mensaje = 'NO :(';
        this.MostarMensaje("No acertaste", false);
        if (this.vidas > 0) {
          this.cartaPrincipal = this.cartaSecundaria;
          this.cartaSecundaria = this.calcularCartaRandom();
        } else {
          this.mostrarFin = true;
        }
      }
    }
  }

  respuesta(res: string): boolean {
    switch (res) {
      case 'mayor':
        return this.cartaPrincipal.valor < this.cartaSecundaria.valor;
      case 'igual':
        return this.cartaPrincipal.valor == this.cartaSecundaria.valor;
      case 'menor':
        return this.cartaPrincipal.valor > this.cartaSecundaria.valor;
      default:
        return false;
    }
  }

  reload() {
    this.cartaPrincipal = this.cartaSecundaria;
    this.cartaSecundaria = this.calcularCartaRandom();
    this.cuenta = 0;
    this.vidas = 5;
    this.mostrarFin = false;
  }

  MostarMensaje(mensaje: string, gano: boolean) {
    this.Mensaje = mensaje;
    this.teclasBloqueadas = true;
    var x = document.getElementById("snackbar");
    if (gano)
      x!.className = "show Ganador";
    else
      x!.className = "show Perdedor";
    var modelo = this;
    setTimeout(function () {
      x!.className = x!.className.replace("show", "");
      modelo.teclasBloqueadas = false;
    }, 2000);
  }
}
