
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../../servicios/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit, OnDestroy {


  usuario!: Usuario;
  Mensaje!:string;
  contrasena2!:string;
  progreso!: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  logueado!:boolean;
  ProgresoDeAncho!:string;

  clase="progress-bar progress-bar-info progress-bar-striped ";
  subscription: Subscription | null = null;
  


  constructor(private fire: Firestore, private authService: AuthService, private router: Router, private fb: FormBuilder)
  {
    
    this.usuario = new Usuario;
    this.progreso=0;
    this.ProgresoDeAncho="0%";
  }

  formRegistro = this.fb.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')
      ]
    ],
    apellido: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    contrasena2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
  });

  ngOnInit() {
    sessionStorage.clear();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async enviar()
  {
    if (!this.formRegistro.valid) {
      this.MostarMensaje("Hay datos inválidos en el formulario, por favor revisarlos", true);
      this.markAllFieldsAsTouched();
      return;
    }

    const formValues = this.formRegistro.value;
    if (formValues.contrasena !== formValues.contrasena2) {
      this.MostarMensaje("Las contraseñas no coinciden, por favor revisarlas", true);
      return;
    }

    // Asignar valores del formulario al objeto usuario
    this.usuario.nombre = formValues.nombre || '';
    this.usuario.apellido = formValues.apellido || '';
    this.usuario.email = formValues.email || '';
    this.usuario.pass = formValues.contrasena || '';
    this.contrasena2 = formValues.contrasena2 || '';

    this.MoverBarraDeProgreso();
    
    try {
      const user = await this.authService.register(this.usuario.email, this.usuario.pass);
      
      if (user) {
        await new Promise(resolve => setTimeout(resolve, 2500));
        this.usuario.tipo = "usuario";
        
        const col = collection(this.fire, 'Usuarios');
        await addDoc(col, {
          email: this.usuario.email,
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          tipo: this.usuario.tipo,
          fechaRegistro: Date.now()
          // Nota: No guardar contraseña en Firestore por seguridad
        });
        
        sessionStorage.setItem("user", this.usuario.email);
        sessionStorage.setItem("muestra", "true");
        this.router.navigateByUrl('/juegos', { replaceUrl: true });
      } else {
        this.MostarMensaje("Usuario ya registrado, por favor utilice otro correo", true);
        this.resetForm();
      }
    } catch (error) {
      console.error('Error en registro:', error);
      this.MostarMensaje("Error de conexión. Intente nuevamente", true);
      this.resetForm();
    }
  }

  markAllFieldsAsTouched() {
    Object.keys(this.formRegistro.controls).forEach(key => {
      this.formRegistro.get(key)?.markAsTouched();
    });
  }

  resetForm() {
    this.usuario = new Usuario();
    this.contrasena2 = "";
    this.logeando = true;
    this.formRegistro.reset();
  }

  MostarMensaje(mensaje:string,gano:boolean) {
    this.Mensaje = mensaje;
   var x = document.getElementById("snackbar");
   if(gano)
       x!.className = "show Ganador";
   var modelo = this;
   setTimeout(function(){ 
     x!.className = x!.className.replace("show", "");
     //modelo.ocultarVerificar=false;
    }, 3000);
  }

  MoverBarraDeProgreso() {

    this.progreso=0;
    this.ProgresoDeAncho="0%";
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Iniciando comprobacion"; 
    let timer = interval(25);
    this.subscription = timer.subscribe(t => {
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+15+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando Usuario..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Verificando contraseña.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Desencriptacion de clave ..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Clave ok, ingresando..";
          break;
          
        case 100:
          console.log("final");
          if (this.subscription) {
            this.subscription.unsubscribe();
          }
          break;
      }     
    });
  }

  borrar() {
    this.resetForm();
  }

}
