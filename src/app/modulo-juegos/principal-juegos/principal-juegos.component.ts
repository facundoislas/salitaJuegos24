import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-juegos',
  standalone: true,
  imports: [],
  templateUrl: './principal-juegos.component.html',
  styleUrl: './principal-juegos.component.css'
})
export class PrincipalJuegosComponent {


  constructor(private router:Router){

  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'ahorcado':
          this.router.navigate(['/juegos/ahorcado']);
        break;
      case 'mayorMenor':
          this.router.navigate(['/juegos/mayorMenor']);
        break;
      case 'adivinaNumero':
          this.router.navigate(['/juegos/adivinaNumero']);
        break;
      case 'preguntados':
          this.router.navigate(['/juegos/preguntados']);
        break;
        
    }
  }
}
