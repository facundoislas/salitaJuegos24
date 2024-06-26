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
		} catch (e) {
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
    catch(e)
    {
      return null;
    }
  }

  isAuth()
  {
    return this.user;
  }
}
