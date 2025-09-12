import { Injectable } from '@angular/core';
import {Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  user: any = "";
  
  async login(email:any, password: any ) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = user;
			return user;
		} catch (e: any) {
      console.error('Error en login:', e);
      // Manejo específico de errores de Firebase
      if (e.code === 'auth/user-not-found') {
        console.error('Usuario no encontrado');
      } else if (e.code === 'auth/wrong-password') {
        console.error('Contraseña incorrecta');
      } else if (e.code === 'auth/invalid-email') {
        console.error('Email inválido');
      }
			return null;
		}
	}

	async logout() {
		return signOut(this.auth);
	}

  async register(email: any, password: any)
  {
    try{
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user = user;
      return user;
    }
    catch(e: any)
    {
      console.error('Error en registro:', e);
      if (e.code === 'auth/email-already-in-use') {
        console.error('El email ya está en uso');
      } else if (e.code === 'auth/weak-password') {
        console.error('La contraseña es muy débil');
      }
      return null;
    }
  }

  isAuth()
  {
    return this.user;
  }
}
