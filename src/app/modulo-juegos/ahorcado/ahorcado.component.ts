import { Component } from '@angular/core';
import { Palabras } from '../../clases/palabras';
import { Router } from '@angular/router';
import { BtnVolverComponent } from "../btn-volver/btn-volver.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ahorcado',
    standalone: true,
    templateUrl: './ahorcado.component.html',
    styleUrl: './ahorcado.component.css',
    imports: [BtnVolverComponent, CommonModule]
})
export class AhorcadoComponent {

  URL_IMAGENES_PRE = "/assets/imagenes/ahorcado/"
  URL_IMAGENES_EXT = ".jpg"  
  
   palabras!: Palabras;
   palabraoculta!: string; 
   Mensaje!:string;
  mascara='';
  abecedario:  Array<string> = [];
  vidas = 6;
  letrasUsadas = "";
  mensaje = "";
  vidaImagen = this.URL_IMAGENES_PRE+"ahorcado1"+this.URL_IMAGENES_EXT; //URL imagen cambiante durante los fallos en el juego
  letrasSeleccionadas: Set<string> = new Set();
  
  
  // Cuenta atras del juego. Si la cuenta llega a cero, el juego se acaba. 
  
  timeLeft: number = 90;
  interval:any;
  juegoOn = true;
  juegoOff = !this.juegoOn;
  selectedLetter:any;
  
    constructor(
      private route: Router, 
      ) {
        this.palabras = new Palabras();
  
       //Rellenamos en el constructor las letras que vamos a utilizar para el juego (minusculas de la a-z)
     for(let letter=0; letter<26; letter++) {
        this.abecedario[letter] = String.fromCharCode(97+letter)
      }     
     } 
  
     //Booleanos que controlan la aparicion o desaparicion de los botones de jugar y volver a intentar   
  
  
    //Definimos las variables del scope que van a interactuar con el DOM por medio del bindeado
  
  
  
  ngOnInit() {   
    this.getPalabras(); //inicializamos el metodo que realiza un servicio GET y se trae todas las palabras del diccionario
    }
  
  //Creamos el método dibujar juego que, una vez elegida la palabra a adivinar, va a enmascararla y mostrarla oculta en el DOM
  
  dibujarJuego(elegida: string) {
    this.palabraoculta = elegida;
    let temp = [...elegida];  
    for (let i=0; i<elegida.length; i++) {   
     temp[i] = '-'
      }    
      this.mascara = temp.join("");
  }     
  
  //Metodo o función principal que se encarga de ejecutar todas las acciones del juego, una vez que pulsamos el boton de "probar suerte" (en el HTML)
  
    game() {
      if (this.selectedLetter != null) {
        let selectedLetter = this.selectedLetter;
      let temp = [...this.mascara];  //Creamos una array temporal que recibe el valor actual de la palabra oculta  
      //let character = 'o'
      let contador = temp.length; //creamos una variable que nos sirve para evaluar. Tambien podemos usar un boolean
  
      for (let i=0; i<temp.length; i++) { //Recorremos la mascara
        if(this.palabraoculta.charAt(i) ==selectedLetter) { //Si la palabra elegida en el comboBox resulta que existe en el bucle, se ejecuta la acción
        temp[i] = selectedLetter; //sustituimos el valor de la posición del array temporal por la palabra elegida
        this.MostarMensaje("Bien, adivinaste la letra", true)
        contador--;       //Indicamos que hemos encontrado un valor correcto, disminuyendo el contador para que sea distinto al valor original 
          }
        } 
        if(contador == temp.length) { //Si el contador tiene un valor identico al original, significa que no hemos acertado letra, y por tanto perdemos vidas
          this.vidas--;
          this.lifes();
          this.MostarMensaje("La letra no esta en la palabra", false)
        }
        this.mascara = temp.join(""); // modificamos el valor de la mascara con el valor del array temporal, convirtiendolo en string por medio de join()
        this.letrasEmpleadas(selectedLetter);  //Insertamos la letra elegida en el array de letras empleadas
        
        if(this.mascara == this.palabraoculta) { //Si la palabra de la mascara coincide con la palabra oculta, significa que hemos ganado. ¡HURRA!  
          this.MostarMensaje("Excelente, Adivinaste la Palabra Secreta", true)     
        this.gameOver(); //En tal caso, ejecutariamos la función de fin de juego
        }   
      } 
    }  
  
    // Metodo que rellena el array de letras utilizadas durante el juego
  
    letrasEmpleadas(selectedLetter:any) {
      let tempusadas = [...this.letrasUsadas];
      tempusadas[(tempusadas.length)] = selectedLetter+" ";
      this.letrasUsadas = tempusadas.join("");
      this.letrasSeleccionadas.add(selectedLetter);
    }

    letraSeleccionada(letra: string) {
      return this.letrasSeleccionadas.has(letra);
    }
  
  
    //Metodo que contiene un switch que nos permite cambiar la imagen que se muestra durante el juego y determinar si el jugador ha perdido, por medio del contador de vidas. 
  
    lifes() {
  switch(this.vidas) {
    case 6:
        this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado1"+this.URL_IMAGENES_EXT;    
      break;
      case 5:    
      this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado2"+this.URL_IMAGENES_EXT;    
      break;
      case 4: 
      this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado3"+this.URL_IMAGENES_EXT;    
      break;
      case 3: 
      this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado4"+this.URL_IMAGENES_EXT;    
      break;
      case 2: 
       this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado5"+this.URL_IMAGENES_EXT;    
      break;  
      case 1: 
       this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado6"+this.URL_IMAGENES_EXT;    
      break;    
      case 0: 
       this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcado7"+this.URL_IMAGENES_EXT;    
      this.gameOver();
      break;   
  
      }
    }
  
    getPalabras() {
      var palabraElegida: string;
  
      //Numero aleatorio que usa la longitud de la consulta para elaborar una posicion en el array
      let words = this.palabras.palabrasParaJuego;
      let aleatorio = (Math.floor(Math.random() * (words.length - 0 + 1)) + 0);
  
      palabraElegida = words[aleatorio];
      this.dibujarJuego(palabraElegida); //Al iniciar, ejecutamos el metodo dibujar      
      console.log(palabraElegida);
    }
  
    cuentaAtras() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
         this.vidas = 0;
         this.lifes();
        }
      },1000)
    }
  
  
  //Metodo que ejecutamos cuando el juego se termina, tanto si hemos perdido o ganado
  
    gameOver() {
       this.juegoOn = false;
    this.juegoOff = !this.juegoOn
      if(this.vidas==0){ //Evaluamos si hemos perdido por medio del marcador de vidas del jugador
    this.mascara = this.palabraoculta;
    this.mensaje = "¡No lograste adivinar la palabra!" 
    } else {
      this.mensaje = "¡Felicitaciones, has ganado!" 
      clearInterval(this.interval);
    }
    }
    
    reiniciar()
    {
      window.location.reload();
    }
  
    letraElegida(obj: any) {
      this.selectedLetter = obj;
      this.game();
    }
  
    //Metodo que nos permite regresar atras
  
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
