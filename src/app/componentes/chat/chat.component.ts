import { Component, ElementRef, ViewChild } from '@angular/core';
import { Mensaje } from '../../clases/mensaje';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BtnVolverComponent } from "../../modulo-juegos/btn-volver/btn-volver.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  public mensaje!: Mensaje;
  public mensajes: Array<any> = [];
  public currentUser: string | null = null;
  private usuariosNombreMap: Record<string, string> = {};

  @ViewChild('messageArea') messageArea?: ElementRef<HTMLDivElement>;

  constructor(private fire: Firestore) {
    this.mensaje = new Mensaje();
  }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.obtenerMensajes();
    this.obtenerUsuarios();
  }

  private scrollToBottom(): void {
    // Desplaza el contenedor al último mensaje
    setTimeout(() => {
      const el = this.messageArea?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }

  obtenerMensajes() {
    const colRef = collection(this.fire, 'mensajesChat');
    const q = query(colRef, orderBy('hora', 'asc'));
    const observable = collectionData(q);
    observable.subscribe((respuesta: any[]) => {
      // Normaliza hora a número para consistencia
      this.mensajes = (respuesta || []).map(m => ({
        ...m,
        hora: typeof m.hora === 'string' ? Number(m.hora) : m.hora,
      }));
      // Garantizar orden ascendente incluso si hay documentos con tipos mixtos o datos antiguos
      this.ordenarMensajesAsc();
      this.scrollToBottom();
    });
  }

  private ordenarMensajesAsc() {
    try {
      this.mensajes.sort((a: any, b: any) => {
        const ha = Number(a?.hora) || 0;
        const hb = Number(b?.hora) || 0;
        return ha - hb;
      });
    } catch {}
  }

  private obtenerUsuarios() {
    const colRef = collection(this.fire, 'Usuarios');
    const observable = collectionData(colRef);
    observable.subscribe((usuarios: any[]) => {
      const map: Record<string, string> = {};
      for (const u of usuarios || []) {
        const email = u?.email || '';
        const nombre = (u?.nombre || '').toString().trim();
        const apellido = (u?.apellido || '').toString().trim();
        if (email) {
          const fullName = `${nombre} ${apellido}`.trim();
          map[email] = fullName || email;
        }
      }
      this.usuariosNombreMap = map;
    });
  }

  async guardarMensaje() {
    const texto = (this.mensaje.texto || '').trim();
    if (!texto) return;

    const usuario = this.currentUser || sessionStorage.getItem('user') || 'Anónimo';
    const colRef = collection(this.fire, 'mensajesChat');
    const now = Date.now();
    await addDoc(colRef, { usuario, hora: now, mensaje: texto });
    // Limpiar input, el stream reactivo actualiza la lista
    this.mensaje = new Mensaje();
    // Forzar scroll al final tras la inserción
    this.scrollToBottom();
  }

  esMio(msj: any): boolean {
    const user = this.currentUser || sessionStorage.getItem('user');
    return !!user && msj?.usuario === user;
  }

  mostrarNombre(email: string | null | undefined): string {
    if (!email) return '';
    return this.usuariosNombreMap[email] || email;
  }
}
