import { Component, NgModule } from '@angular/core';
import { Mensaje } from '../../clases/mensaje';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


  public mensaje!:Mensaje;
  public mensajes: Array<any> = [];

  constructor(private fire: Firestore)
  {
    this.mensaje = new Mensaje();
  }

  obtenerMensajes()//ordenar por fecha y hora
  {
    const col = collection(this.fire, 'mensajesChat');
    const observable =  collectionData(col);

    observable.subscribe((respuesta)=>{
      this.mensajes = respuesta
      console.log(this.mensajes);
      this.mensajes.sort((a,b)=> a.hora - b.hora);
      console.log(this.mensajes)
    }
    
    );
   
  }
  
  guardarMensaje()
  {
    let usuario = sessionStorage.getItem('user');
    this.mensaje.fecha =  (Date.now()).toString();
    const col= collection(this.fire, 'mensajesChat');
    addDoc(col, {usuario: usuario, hora: this.mensaje.fecha, mensaje: this.mensaje.texto });
    this.obtenerMensajes();
    this.mensaje = new Mensaje();
  }

  ngOnInit()
  {
    this.obtenerMensajes();
  }

  handleKeyPress(event:any) {
    if (event.keyCode === 13) { // 13 es el código de la tecla Enter
      this.guardarMensaje()
      // Aquí puedes realizar la acción que desees
    }

  }

}
