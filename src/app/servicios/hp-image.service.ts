import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HpImageService {

  constructor(private http: HttpClient) { 
    
  }
 
  getPersonaje(num: string):Observable<any>
  {
    return this.http.get<any>('https://hp-api.onrender.com/api/character/' + num);
  }

  getPersonajes():Observable<any>
  {
    return this.http.get<any>('https://hp-api.onrender.com/api/characters');
  }
}
